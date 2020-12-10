import TransactionRepository from '@/domain/transaction/transaction.repository';
import DateUtils from '@/lib/date-utils';
import UserDTO from '@/domain/auth/types/user-dto';
import { AggregateData, AggregateValue, AggregateResponse, MaxCategory } from './types';

export default class AggregateService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async getAggregateCategory(
    startDate: Date,
    endDate: Date,
    uid: number,
  ): Promise<AggregateResponse> {
    const query = `select t2.is_income as isIncome, c1.name as category, t1.aggregate, t2.tid, t2.amount, t2.trade_at as tradeAt, t2.description, p1.name as payment
    from (select cid, sum(amount) as aggregate
    from transaction
    where uid = ${uid} and trade_at between '${startDate}' and '${endDate}'
    group by cid) t1, (select * from transaction where uid = ${uid} and trade_at between '${startDate}' and '${endDate}') t2, (select * from category where uid = ${uid}) c1, (select * from payment where uid = ${uid}) p1
    where t2.cid = t1.cid and t1.cid = c1.cid and t2.pid = p1.pid
    order by t2.is_income ASC, t1.aggregate DESC, t2.trade_at DESC;`;

    const aggregateList: AggregateData[] = await this.transactionRepository.query(query);
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

    const overspendingIndex = averageIncome
      ? (sumSpendingAmountOfMonth / averageIncome).toFixed(2)
      : 0;
    return {
      overspendingIndex: Number(overspendingIndex),
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
    if (new Date(year, month, 1).getTime() <= new Date(user.createAt).setDate(1)) {
      return 0;
    }

    const startDateOfYear = new Date(year, 0, 1);
    const lastMonth = new Date(year, month - 1, 0);
    const startDate = new Date(Math.max(startDateOfYear.getTime(), user.createAt.getTime()));
    const { sum } = await this.transactionRepository.sumAmountBetween({
      uid: user.uid,
      isIncome: true,
      startDate: DateUtils.dateToString(startDate),
      endDate: DateUtils.dateToString(lastMonth),
    });

    const numOfMonthFromStartDateToLastMonth = DateUtils.countMonthBetween(startDate, lastMonth);
    const averageIncome = Number(sum || 0) / numOfMonthFromStartDateToLastMonth;
    return Math.round(averageIncome);
  }
}
