/* eslint-disable no-await-in-loop */
import UserEntity from '@entity/user.entity';
import CategoryEntity from '@entity/category.entity';
import PaymentEntity from '@entity/payment.entity';
import TransactionEntity from '@entity/transaction.entity';
import { Connection } from 'typeorm';
import SeedGenerator from './seed-generator';

const clear = async (connection: Connection): Promise<void> => {
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
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

const up = async ({
  connection,
  numOfUsers,
  numOfTransactionsPerMonth,
  startDate,
  endDate,
}: {
  connection: Connection;
  numOfUsers: number;
  numOfTransactionsPerMonth: number;
  startDate: Date;
  endDate: Date;
}): Promise<void> => {
  const queryRunner = connection.createQueryRunner();
  const { manager } = queryRunner;
  await queryRunner.startTransaction();
  try {
    await clear(connection);
    const { users, categories, payments, transactions } = SeedGenerator.generateSeedData({
      numOfUsers,
      numOfTransactionsPerMonth,
      startDate,
      endDate,
    });
    await manager.insert('user', users);
    await manager.insert('category', categories);
    await manager.insert('payment', payments);
    await manager.insert('transaction', transactions);
    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
};

export default { up, clear };
