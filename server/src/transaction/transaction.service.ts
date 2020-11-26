import FixedExpenditureEntity from 'entity/fixed-expenditure.entity';
import UserEntity from 'entity/user.entity';
import TranscationEntity from 'entity/transaction.entity';
import { getRepository, Between } from 'typeorm';

type fixedType = {
  tradeAt: Date;
  amount: number;
  description: string;
  uid: number;
};

const TransactionService = {
  getFixedExpenditure: async (uid: number) => {
    const userRepository = getRepository(UserEntity);
    const fixedRepository = getRepository(FixedExpenditureEntity);

    const user = await userRepository.findOne({ where: { uid } });
    const updateAt = user?.updateAt ? new Date(user?.updateAt) : undefined;
    const today = new Date();

    if (!updateAt) {
      await TransactionService.createFixedExpenditure(uid);
    } else if (updateAt.getMonth() !== today.getMonth()) {
      await fixedRepository.delete(uid);
      await TransactionService.createFixedExpenditure(uid);
    }

    const fixedData = await fixedRepository.find({ where: { uid }, order: { tradeAt: 'ASC' } });
    return fixedData;
  },

  createFixedExpenditure: async (uid: number) => {
    const transactionRepository = getRepository(TranscationEntity);
    const fixedRepository = getRepository(FixedExpenditureEntity);
    const userRepository = getRepository(UserEntity);

    const today = new Date();
    const startDate = new Date();
    const endDate = new Date();
    startDate.setFullYear(today.getFullYear(), today.getMonth() - 3, 1);
    endDate.setFullYear(today.getFullYear(), today.getMonth(), 1);

    const list = await transactionRepository.find({
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

    const fixedArray: Array<fixedType> = [];
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
    await userRepository.update({ uid }, { updateAt: today });
    if (fixedArray.length > 0) {
      const fixedExp = fixedRepository.create(fixedArray);
      await fixedRepository.save(fixedExp);
    }
  },
};

export default TransactionService;
