/* eslint-disable no-await-in-loop */
import createDBConnection from '@/loader/database';
import SeedGenerator from './seed-generator';

const up = async () => {
  const connection = await createDBConnection();
  const queryRunner = connection.createQueryRunner();
  const { manager } = queryRunner;
  await queryRunner.startTransaction();
  try {
    const { users, categories, payments, transactions } = SeedGenerator.generateSeedData({
      numOfUsers: 2500,
      numOfTransactionsPerMonth: 40,
      startDate: new Date('2020-01-01'),
      endDate: new Date(),
    });
    await manager.insert('user', users);
    await manager.insert('category', categories);
    await manager.insert('payment', payments);
    const transactionQuantity = 100000;
    for (let i = 0; i < transactions.length; i += transactionQuantity) {
      const remains = transactions.length - i;
      const currentQuantity = Math.min(transactionQuantity, remains);
      const endIdx = Math.min(i + currentQuantity, transactions.length);
      await manager.insert('transaction', transactions.slice(i, endIdx));
    }
    await queryRunner.commitTransaction();
    console.log('Seed finished');
  } catch (err) {
    console.log(err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await connection.close();
    console.log('Close connection');
  }
};

up();
