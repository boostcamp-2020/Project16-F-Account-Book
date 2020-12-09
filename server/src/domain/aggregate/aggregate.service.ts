import TransactionRepository from '@/domain/transaction/transaction.repository';
import DateUtils from '@/lib/date-utils';
import UserDTO from '../auth/types/user-dto';
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

  public async getMaxCategory(uid: number): Promise<MaxCategory> {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(1);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0);

    const query = `select category.name, t1.aggregate
    from category, (select cid, sum(amount) as aggregate
    from transaction 
    where uid=${uid} and trade_at between '${startDate}' and '${endDate}'
    group by cid) t1
    where category.cid = t1.cid
    order by t1.aggregate DESC;`;

    const maxCategory: Array<MaxCategory> = await this.transactionRepository.query(query);
    return maxCategory[0];
  }

  public async getOverspendingIndex(
    user: UserDTO,
  ): Promise<{
    overspendingIndex: number;
    averageIncome: number;
    expenditureThisMonth: number;
  }> {
    const [averageIncome, expenditureThisMonth] = await Promise.all([
      this.getAverageIncome(user),
      this.getExpenditureThisMonth(user),
    ]);

    const overspendingIndex = (expenditureThisMonth / averageIncome).toFixed(2);
    return {
      overspendingIndex: Number(overspendingIndex),
      averageIncome,
      expenditureThisMonth,
    };
  }

  private async getExpenditureThisMonth(user: UserDTO): Promise<number> {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const { sum } = await this.transactionRepository.sumAmount(
      user.uid,
      false,
      DateUtils.dateToString(startDate),
      DateUtils.dateToString(endDate),
    );

    return Number(sum || 0);
  }

  private async getAverageIncome(user: UserDTO): Promise<number> {
    const today = new Date();
    const startDate = new Date(
      Math.max(new Date(today.getFullYear(), 0, 1).getTime(), user.createAt.getTime()),
    );
    const endDate = new Date(today.getFullYear(), today.getMonth(), 0);

    const { sum } = await this.transactionRepository.sumAmount(
      user.uid,
      true,
      DateUtils.dateToString(startDate),
      DateUtils.dateToString(endDate),
    );

    const numOfMonthFromStartDateToLastMonth = DateUtils.countMonthBetween(startDate, endDate);
    const averageIncome = Number(sum || 0) / numOfMonthFromStartDateToLastMonth;
    return Math.round(averageIncome);
  }
}
