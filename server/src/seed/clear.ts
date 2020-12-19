import createDBConnection from '@/loader/database';
import UserEntity from '@/entity/user.entity';
import CategoryEntity from '@/entity/category.entity';
import PaymentEntity from '@/entity/payment.entity';
import TransactionEntity from '@/entity/transaction.entity';
import FixedExpenditureEntity from '@/entity/fixed-expenditure.entity';

const clear = async () => {
  const connection = await createDBConnection();
  const queryRunner = connection.createQueryRunner();
  const { manager } = queryRunner;
  await queryRunner.startTransaction();
  try {
    await manager.query('SET FOREIGN_KEY_CHECKS = 0');
    await manager.clear(TransactionEntity);
    await Promise.all([
      manager.clear(PaymentEntity),
      manager.clear(CategoryEntity),
      manager.clear(FixedExpenditureEntity),
    ]);
    await manager.clear(UserEntity);
    await manager.query('SET FOREIGN_KEY_CHECKS = 1');
    await queryRunner.commitTransaction();
    console.log('Seed finished');
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await connection.close();
    console.log('Close connection');
  }
};

clear();
