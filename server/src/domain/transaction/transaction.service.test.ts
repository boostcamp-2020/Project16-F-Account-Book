import createDBConnection from '@/loader/database';
import { Connection, Repository } from 'typeorm';
import TransactionEntity from '@/entity/transaction.entity';
import TestSeeder from '@/seed/test.seed';
import TransactionService from './transaction.service';
import TransactionRepository from './transaction.repository';

let transactionRepository: Repository<TransactionEntity>;
let transactionService: TransactionService;
let connection: Connection;

beforeAll(async () => {
  connection = await createDBConnection();
  transactionRepository = TransactionRepository.getTransactionRepository();
  transactionService = new TransactionService(transactionRepository);
});

afterAll(async () => {
  await connection.close();
});

describe('TransactionService Tests', () => {
  beforeEach(async () => {
    await TestSeeder.clear(connection);
    await TestSeeder.up({
      connection,
      numOfUsers: 1,
      numOfTransactionsPerUser: 50,
      startDate: new Date('2020-10-01'),
      endDate: new Date('2020-11-01'),
    });
  });

  afterEach(async () => {
    await TestSeeder.clear(connection);
  });
  describe('getMonthlyTransactions() Tests', () => {
    it('응답된 데이터는 모두 2020년 10월 데이터이다.', async () => {
      const transactionsOfMonth = await transactionService.getTransactionDetailsOfMonth({
        uid: 1,
        year: 2020,
        month: 10,
      });
      expect(transactionsOfMonth.length).toEqual(50);
      expect(
        transactionsOfMonth.every(
          (transaction) =>
            new Date(transaction.tradeAt).getFullYear() === 2020 &&
            new Date(transaction.tradeAt).getMonth() + 1 === 10,
        ),
      ).toEqual(true);
    });
  });

  describe('deleteTransaction() Tests', () => {
    it('delete 된 내역을 반환한다.', async () => {
      const deletedTransaction = await transactionService.deleteTransaction(1, 1);
      expect(deletedTransaction).not.toBeNull();
      expect(deletedTransaction.tid).toEqual(1);
      expect(await transactionRepository.findOne({ where: { tid: 1 } })).toBeUndefined();
    });
  });
});
