import { getRepository, Repository } from 'typeorm';
import TransactionEntity from '@entity/transaction.entity';

const getTransactionRepository = (): Repository<TransactionEntity> => {
  return getRepository(TransactionEntity);
};

export default { getTransactionRepository };
