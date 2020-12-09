import { Connection, getConnection, getCustomRepository } from 'typeorm';
import TestSeeder from '@/seed/test.seed';
import TransactionRepository from '@/domain/transaction/transaction.repository';
import AggregateService from './aggregate.service';

let transactionRepository: TransactionRepository;
let aggregateService: AggregateService;
let connection: Connection;

describe('TransactionService Tests', () => {
  beforeAll(async () => {
    connection = getConnection();
    transactionRepository = getCustomRepository(TransactionRepository);
    aggregateService = new AggregateService(transactionRepository);
  });

  afterEach(async () => {
    await TestSeeder.clear(connection);
  });

  describe('getOverspendingIndex() Tests', () => {
    it('과소비 지수가 정상적으로 생성되는지 확인', async () => {
      await TestSeeder.up({
        connection,
        numOfUsers: 1,
        numOfTransactionsPerUser: 100,
        startDate: new Date('2020-05-12'),
        endDate: new Date('2020-12-31'),
      });
      const user = {
        uid: 1,
        name: 'testUser',
        socialType: 'google',
        updateAt: new Date('2020-05-12'),
        createAt: new Date('2020-05-12'),
      };
      const {
        overspendingIndex,
        averageIncome,
        expenditureThisMonth,
      } = await aggregateService.getOverspendingIndex(user);

      expect(averageIncome).toBeGreaterThanOrEqual(0);
      expect(expenditureThisMonth).toBeGreaterThanOrEqual(0);
      if (averageIncome <= expenditureThisMonth) {
        expect(overspendingIndex).toBeGreaterThanOrEqual(1);
      } else {
        expect(overspendingIndex).toBeLessThan(1);
      }
    });
  });
});
