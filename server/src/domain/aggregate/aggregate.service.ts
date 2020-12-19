import TransactionRepository from '@/domain/transaction/transaction.repository';
import DateUtils from '@/lib/date-utils';
import UserDTO from '@/domain/user/types/user-dto';
import { AggregateData, AggregateValue, AggregateResponse, MaxCategory } from './types';

export default class AggregateService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async getAggregateCategory(
    uid: number,
    year: number,
    month: number,
  ): Promise<AggregateResponse> {
    const { startDate, endDate } = DateUtils.getStartDateAndEndDate(year, month);

    const aggregateList: AggregateData[] = await this.transactionRepository.query(`
    select t2.is_income as isIncome, (select name from category c1 where c1.cid = t1.cid) as category, t1.aggregate, t2.tid, t2.amount, t2.trade_at as tradeAt, t2.description, (select name from payment p1 where p1.pid = t2.pid) as payment
    from (select cid, sum(amount) as aggregate from transaction where uid = ${uid} and trade_at between '${startDate}' and '${endDate}' group by cid) t1 inner join
    transaction t2 on t1.cid = t2.cid
    where t2.uid = ${uid} and t2.trade_at between '${startDate}' and '${endDate}'
	order by t1.aggregate DESC, t2.trade_at DESC;
    `);
    const incomeMap: Map<string, AggregateValue> = new Map();
    const expenditureMap: Map<string, AggregateValue> = new Map();

    aggregateList.forEach((data) => {
      const { isIncome, category, aggregate, tid, amount, tradeAt, description, payment } = data;
      if (isIncome) {
        if (!incomeMap.has(category)) {
          incomeMap.set(category, { category, aggregate, dataArray: [] });
        }
        (incomeMap.get(category) as AggregateValue).dataArray.push({
          tid,
          amount,
          tradeAt,
          description,
          payment,
        });
      } else {
        if (!expenditureMap.has(category)) {
          expenditureMap.set(category, { category, aggregate, dataArray: [] });
        }
        (expenditureMap.get(category) as AggregateValue).dataArray.push({
          tid,
          amount,
          tradeAt,
          description,
          payment,
        });
      }
    });

    const income: AggregateValue[] = [];
    const expenditure: AggregateValue[] = [];

    incomeMap.forEach((value) => {
      income.push(value);
    });
    expenditureMap.forEach((value) => {
      expenditure.push(value);
    });

    return { income, expenditure };
  }

  public async getMaxCategory(uid: number, year: number, month: number): Promise<MaxCategory> {
    const { startDate, endDate } = DateUtils.getStartDateAndEndDate(year, month);

    const maxCategory: MaxCategory = await this.transactionRepository.query(`
    select (select name from category c1 where c1.cid = t1.cid) as name, sum(amount) as aggregate
    from transaction t1
    where t1.uid = ${uid} and t1.trade_at between '${startDate}' and '${endDate}' and t1.is_income = false
    group by cid order by aggregate DESC limit 1;
    `);
    return maxCategory;
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
      startDate,
      endDate,
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
