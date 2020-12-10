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
        numOfTransactionsPerMonth: 30,
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
        sumSpendingAmountOfMonth,
      } = await aggregateService.getOverspendingIndex(user, 2020, 12);

      expect(averageIncome).toBeGreaterThan(0);
      expect(sumSpendingAmountOfMonth).toBeGreaterThan(0);
      if (averageIncome <= sumSpendingAmountOfMonth) {
        expect(overspendingIndex).toBeGreaterThanOrEqual(1);
      } else {
        expect(overspendingIndex).toBeLessThan(1);
      }
    });

    it('이번달에 가입한 유저라면 과소비 지수가 계산되지 않는다.', async () => {
      const today = new Date();
      const user = {
        uid: 1,
        name: 'testUser',
        socialType: 'google',
        updateAt: today,
        createAt: today,
      };

      const {
        overspendingIndex,
        averageIncome,
        sumSpendingAmountOfMonth,
      } = await aggregateService.getOverspendingIndex(
        user,
        today.getFullYear(),
        today.getMonth() + 1,
      );

      expect(averageIncome).toEqual(0);
      expect(sumSpendingAmountOfMonth).toBeGreaterThanOrEqual(0);
      expect(overspendingIndex).toEqual(0);
    });

    it('유저의 가입일 이전 날짜를 기준으로 과소비 지수가 계산되지 않는다.', async () => {
      await TestSeeder.up({
        connection,
        numOfUsers: 1,
        numOfTransactionsPerMonth: 15,
        startDate: new Date('2020-03-15'),
        endDate: new Date('2020-12-31'),
      });

      const registeredAt = new Date('2020-03-15');
      const user = {
        uid: 1,
        name: 'testUser',
        socialType: 'google',
        updateAt: registeredAt,
        createAt: registeredAt,
      };

      const {
        overspendingIndex,
        averageIncome,
        sumSpendingAmountOfMonth,
      } = await aggregateService.getOverspendingIndex(user, 2020, 2);

      expect(averageIncome).toEqual(0);
      expect(sumSpendingAmountOfMonth).toEqual(0);
      expect(overspendingIndex).toEqual(0);
    });
  });
});
