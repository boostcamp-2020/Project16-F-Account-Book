/* eslint-disable no-await-in-loop */
import createDBConnection from '@/loader/database';
import generateSeedData from './generateSeedData';

const up = async () => {
  const connection = await createDBConnection();
  const queryRunner = connection.createQueryRunner();
  const { manager } = queryRunner;
  await queryRunner.startTransaction();
  try {
    const { users, categories, payments, transactions } = generateSeedData();
    await manager.insert('User', users);
    await manager.insert('Category', categories);
    await manager.insert('Payment', payments);
    const transactionQuantity = 100000;
    for (let i = 0; i < transactions.length; i += transactionQuantity) {
      const remains = transactions.length - i;
      const currentQuantity = Math.min(transactionQuantity, remains);
      const endIdx = Math.min(i + currentQuantity, transactions.length);
      await manager.insert('Transaction', transactions.slice(i, endIdx));
    }
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

up();
