import FixedExpenditureEntity from '@/entity/fixed-expenditure.entity';
import UserEntity from '@/entity/user.entity';
import TranscationEntity from '@/entity/transaction.entity';
import { Repository, Between } from 'typeorm';
import DateUtils from '@/lib/date-utils';
import { FixedType, InputType, ResultType, ResponseType } from './types';

export default class FixedExpenditureService {
  private fixedExpenditureRepository: Repository<FixedExpenditureEntity>;

  private userRepository: Repository<UserEntity>;

  private transactionRepository: Repository<TranscationEntity>;

  constructor(
    fixedExpenditureRepository: Repository<FixedExpenditureEntity>,
    userRepository: Repository<UserEntity>,
    transactionRepository: Repository<TranscationEntity>,
  ) {
    this.fixedExpenditureRepository = fixedExpenditureRepository;
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
  }

  public async getFixedExpenditure(
    uid: number,
    updateAt: Date | undefined,
    year: number,
    month: number,
  ): Promise<ResponseType> {
    const startDate = DateUtils.dateToString(new Date(year, month, 1));
    const endDate = DateUtils.dateToString(new Date(year, Number(month) + 1, 0));

    if (!updateAt || updateAt.getFullYear() < year || updateAt.getMonth() < month) {
      await this.createFixedExpenditure(uid, year, month);
    }

    const fixedDatas: ResultType[] = await this.fixedExpenditureRepository
      .query(`select f1.fid, f1.trade_at as tradeAt, f1.amount as estimatedAmount, f1.description, t1.amount as paidAmount
    from (select * from fixed_expenditure where uid=${uid} and trade_at between '${startDate}' and '${endDate}') f1 
    left outer join (select * from transaction where uid=${uid} and trade_at between '${startDate}' and '${endDate}') t1 on f1.uid = t1.uid and f1.trade_at = t1.trade_at and t1.description = f1.description
    order by f1.trade_at ASC;`);

    const paid: FixedType[] = [];
    const estimated: FixedType[] = [];

    fixedDatas.forEach((fixedData) => {
      if (fixedData.paidAmount) {
        paid.push({
          fid: fixedData.fid,
          tradeAt: fixedData.tradeAt,
          amount: fixedData.paidAmount,
          description: fixedData.description,
        });
      } else {
        estimated.push({
          fid: fixedData.fid,
          tradeAt: fixedData.tradeAt,
          amount: fixedData.estimatedAmount,
          description: fixedData.description,
        });
      }
    });

    return { paid, estimated };
  }

  private async createFixedExpenditure(uid: number, year: number, month: number): Promise<void> {
    const today = new Date();
    const startDate = new Date(year, Number(month) - 3, 1);
    const endDate = new Date(year, month, 0);

    const list = await this.transactionRepository.find({
      where: { uid, tradeAt: Between(startDate, endDate), isIncome: false },
    });

    let key = '';
    const map = new Map();
    list.forEach((transaction) => {
      const { amount, tradeAt, description } = transaction;
      key = `${tradeAt.toString().slice(8)}-${description}`;
      if (map.has(key)) {
        map.set(key, { count: map.get(key).count + 1, amount: map.get(key).amount + amount });
      } else {
        map.set(key, { count: 1, amount });
      }
    });
    const fixedArray: InputType[] = [];
    map.forEach((value, mapKey) => {
      if (value.count > 2) {
        const fixedData = mapKey.split('-');
        const setDay = new Date();
        setDay.setDate(fixedData[0]);
        fixedArray.push({
          tradeAt: setDay,
          amount: value.amount,
          description: fixedData[1],
          uid,
        });
      }
    });
    await this.userRepository.update({ uid }, { updateAt: today });
    if (fixedArray.length > 0) {
      const fixedExp = this.fixedExpenditureRepository.create(fixedArray);
      await this.fixedExpenditureRepository.save(fixedExp);
    }
  }
}
