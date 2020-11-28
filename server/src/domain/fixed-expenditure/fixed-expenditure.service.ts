import FixedExpenditureEntity from '@/entity/fixed-expenditure.entity';
import UserEntity from '@/entity/user.entity';
import TranscationEntity from '@/entity/transaction.entity';
import { Repository, Between } from 'typeorm';
import { FixedType } from './types';

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

  public async getFixedExpenditure(uid: number): Promise<FixedExpenditureEntity[]> {
    const user = await this.userRepository.findOne({ where: { uid } });
    const updateAt = user?.updateAt ? new Date(user?.updateAt) : undefined;
    const today = new Date();

    if (!updateAt) {
      await this.createFixedExpenditure(uid);
    } else if (updateAt.getMonth() !== today.getMonth()) {
      await this.fixedExpenditureRepository.delete(uid);
      await this.createFixedExpenditure(uid);
    }

    const fixedData = await this.fixedExpenditureRepository.find({
      where: { uid },
      order: { tradeAt: 'ASC' },
    });
    return fixedData;
  }

  public async createFixedExpenditure(uid: number): Promise<void> {
    const today = new Date();
    const startDate = new Date();
    const endDate = new Date();
    startDate.setFullYear(today.getFullYear(), today.getMonth() - 3, 1);
    endDate.setFullYear(today.getFullYear(), today.getMonth(), 1);

    const list = await this.transactionRepository.find({
      where: { uid, tradeAt: Between(startDate, endDate), isIncome: false },
    });

    let key = '';
    const map = new Map();
    list.forEach((transaction) => {
      const { amount, tradeAt, description } = transaction;
      key = `${tradeAt.toString().slice(8)}-${description}-${amount}`;
      if (map.has(key)) {
        map.set(key, map.get(key) + 1);
      } else {
        map.set(key, 1);
      }
    });
    const fixedArray: Array<FixedType> = [];
    map.forEach((value, mapKey) => {
      if (value > 2) {
        const fixedData = mapKey.split('-');
        const setDay = new Date();
        setDay.setDate(fixedData[0]);
        fixedArray.push({
          tradeAt: setDay,
          amount: Number(fixedData[2]),
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
