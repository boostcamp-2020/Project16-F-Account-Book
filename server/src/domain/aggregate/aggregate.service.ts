import TranscationEntity from '@/entity/transaction.entity';
import { Repository } from 'typeorm';
import { AggregateData, AggregateValue, AggregateResponse, MaxCategory } from './types';

export default class AggregateService {
  private transactionRepository: Repository<TranscationEntity>;

  constructor(transactionRepository: Repository<TranscationEntity>) {
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
}
