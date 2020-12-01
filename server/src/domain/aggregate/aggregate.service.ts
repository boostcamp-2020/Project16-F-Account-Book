import TranscationEntity from '@/entity/transaction.entity';
import { Repository } from 'typeorm';
import { AggregateData, AggregateResponse } from './types';

export default class AggregateService {
  private transactionRepository: Repository<TranscationEntity>;

  constructor(transactionRepository: Repository<TranscationEntity>) {
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
}
