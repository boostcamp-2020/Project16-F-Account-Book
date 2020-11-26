import { getRepository, Repository } from 'typeorm';
import TransactionEntity from '@entity/transaction.entity';

const getTransactionRepository = (): Repository<TransactionEntity> => {
  const transactionRepository = getRepository(TransactionEntity);
  return transactionRepository;
};

export default { getTransactionRepository };
