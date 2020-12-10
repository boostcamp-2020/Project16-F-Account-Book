import TransactionRepository from '@/domain/transaction/transaction.repository';
import DateUtils from '@/lib/date-utils';
import UserDTO from '@/domain/auth/types/user-dto';
import { AggregateData, AggregateResponse, MaxCategory } from './types';

export default class AggregateService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async getAggregateCategory(
    startDate: Date,
    endDate: Date,
    income: boolean,
    uid: number,
  ): Promise<AggregateResponse[]> {
    const query = `select (select name from category where cid=t1.cid) as category, t1.aggregate, t2.amount, t2.trade_at as tradeAt, t2.description, t2.is_income as isIncome, (select name from payment where pid=t2.pid) as payment
    from (select cid, sum(amount) as aggregate
    from transaction
    where uid = ${uid} and trade_at between '${startDate}' and '${endDate}'
    group by cid) t1, transaction t2
    where t2.cid = t1.cid and t2.uid = ${uid} and t2.is_income = ${income} and trade_at between '${startDate}' and '${endDate}'
    order by t1.aggregate DESC, t2.cid ASC, t2.trade_at DESC;`;

    const aggregateList: AggregateData[] = await this.transactionRepository.query(query);
    const map: Map<string, AggregateResponse> = new Map();

    aggregateList.forEach((data) => {
      const { category, aggregate, amount, tradeAt, description, isIncome, payment } = data;
      if (!map.has(category)) {
        map.set(category, { category, aggregate, list: [] });
      }
      (map.get(category) as AggregateResponse).list.push({
        amount,
        tradeAt,
        description,
        isIncome,
        payment,
      });
    });

    const response: Array<AggregateResponse> = [];
    map.forEach((value) => {
      response.push(value);
    });

    return response;
  }

  public async getMaxCategory(uid: number, year: number, month: number): Promise<MaxCategory> {
    const { startDate, endDate } = DateUtils.getStartDateAndEndDate(year, month);

    const query = `select category.name, t1.aggregate
    from category, (select cid, sum(amount) as aggregate
    from transaction 
    where uid=${uid} and is_income=${false} and trade_at between '${DateUtils.dateToString(
      startDate,
    )}' and '${DateUtils.dateToString(endDate)}'
    group by cid) t1
    where category.cid = t1.cid
    order by t1.aggregate DESC;`;

    const maxCategory: Array<MaxCategory> = await this.transactionRepository.query(query);
    return maxCategory[0];
  }

  public async getOverspendingIndex(
    user: UserDTO,
    year: number,
    month: number,
  ): Promise<{
    overspendingIndex: number;
    averageIncome: number;
    sumSpendingAmountOfMonth: number;
  }> {
    const [averageIncome, sumSpendingAmountOfMonth] = await Promise.all([
      this.getAverageIncome(user, year, month),
      this.getSumSpendingAmountOfMonth(user, year, month),
    ]);

    let overspendingIndex = 0;
    if (!averageIncome) {
      overspendingIndex = sumSpendingAmountOfMonth ? 1 : 0;
    } else {
      overspendingIndex = Number((sumSpendingAmountOfMonth / averageIncome).toFixed(2));
    }

    return {
      overspendingIndex,
      averageIncome,
      sumSpendingAmountOfMonth,
    };
  }

  private async getSumSpendingAmountOfMonth(
    user: UserDTO,
    year: number,
    month: number,
  ): Promise<number> {
    const { startDate, endDate } = DateUtils.getStartDateAndEndDate(year, month);
    const { sum } = await this.transactionRepository.sumAmountBetween({
      uid: user.uid,
      isIncome: false,
      startDate: DateUtils.dateToString(startDate),
      endDate: DateUtils.dateToString(endDate),
    });

    return Number(sum || 0);
  }

  private async getAverageIncome(user: UserDTO, year: number, month: number): Promise<number> {
    const startDateOfYear = new Date(year, 0, 1);
    const endDate = new Date(year, month, 0);
    const startDate = new Date(Math.max(startDateOfYear.getTime(), user.createAt.getTime()));
    const { sum } = await this.transactionRepository.sumAmountBetween({
      uid: user.uid,
      isIncome: true,
      startDate: DateUtils.dateToString(startDate),
      endDate: DateUtils.dateToString(endDate),
    });

    const numOfMonthFromStartDateToLastMonth = DateUtils.countMonthBetween(startDate, endDate);
    const averageIncome = Number(sum || 0) / numOfMonthFromStartDateToLastMonth;
    return Math.round(averageIncome);
  }
}
