import { Connection, getConnection, getCustomRepository } from 'typeorm';
import TestSeeder from '@/seed/test.seed';
import TransactionService from './transaction.service';
import TransactionRepository from './transaction.repository';

let transactionRepository: TransactionRepository;
let transactionService: TransactionService;
let connection: Connection;

describe('TransactionService Tests', () => {
  beforeAll(async () => {
    connection = getConnection();
    transactionRepository = getCustomRepository(TransactionRepository);
    transactionService = new TransactionService(transactionRepository);
  });

  beforeEach(async () => {
    await TestSeeder.clear(connection);
    await TestSeeder.up({
      connection,
      numOfUsers: 1,
      numOfTransactionsPerMonth: 50,
      startDate: new Date('2020-10-01'),
      endDate: new Date('2020-10-31'),
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

  describe('createTransactions() Tests', () => {
    it('등록에 성공하면 생성된 엔티티 데이터를 반환한다.', async () => {
      const payload = {
        amount: 1000,
        tradeAt: new Date('2020-12-03'),
        description: '간식 사먹음',
        isIncome: false,
        uid: 1,
        cid: 2,
        pid: 1,
      };
      const newTransaction = await transactionService.createTransaction(payload);
      expect(newTransaction.isIncome).toEqual(payload.isIncome);
      expect(new Date(newTransaction.tradeAt)).toEqual(payload.tradeAt);
      expect(newTransaction.amount).toEqual(payload.amount);
      expect(newTransaction.description).toEqual(payload.description);
      expect(newTransaction.cid).toEqual(payload.cid);
      expect(newTransaction.pid).toEqual(payload.pid);
      expect(newTransaction.uid).toEqual(payload.uid);
    });
  });

  describe('updateTransactions() Tests', () => {
    it('수정에 성공하면 수정된 엔티티 데이터를 반환한다.', async () => {
      const payload = {
        amount: 1000,
        tradeAt: new Date('2020-12-03'),
        description: '간식 사먹음',
        isIncome: false,
        uid: 1,
        cid: 2,
        pid: 1,
      };
      const updatedTransaction = await transactionService.updateTransaction(1, 1, payload);
      expect(updatedTransaction.isIncome).toEqual(payload.isIncome);
      expect(new Date(updatedTransaction.tradeAt)).toEqual(payload.tradeAt);
      expect(updatedTransaction.amount).toEqual(payload.amount);
      expect(updatedTransaction.description).toEqual(payload.description);
      expect(updatedTransaction.cid).toEqual(payload.cid);
      expect(updatedTransaction.pid).toEqual(payload.pid);
      expect(updatedTransaction.uid).toEqual(payload.uid);
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
