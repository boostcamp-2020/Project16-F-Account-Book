import createDBConnection from '@/loader/database';
import UserEntity from '@entity/user.entity';
import CategoryEntity from '@entity/category.entity';
import PaymentEntity from '@entity/payment.entity';
import TransactionEntity from '@entity/transaction.entity';

const clear = async () => {
  const connection = await createDBConnection();
  const queryRunner = connection.createQueryRunner();
  const { manager } = queryRunner;
  await queryRunner.startTransaction();
  try {
    await manager.query('SET FOREIGN_KEY_CHECKS = 0');
    await manager.clear(TransactionEntity);
    await manager.clear(PaymentEntity);
    await manager.clear(CategoryEntity);
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
