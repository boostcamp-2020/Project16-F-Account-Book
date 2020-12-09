import { EntityRepository, Repository } from 'typeorm';
import TransactionEntity from '@/entity/transaction.entity';

@EntityRepository(TransactionEntity)
class TransactionRepository extends Repository<TransactionEntity> {
  sumAmount(
    uid: number,
    isIncome: boolean,
    startDate: string,
    endDate: string,
  ): Promise<{ sum: string }> {
    return this.createQueryBuilder()
      .select('SUM(amount)', 'sum')
      .where('uid = :uid', { uid })
      .andWhere('is_income = :isIncome', { isIncome })
      .andWhere('trade_at BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawOne();
  }
}

export default TransactionRepository;
