import createDBConnection from '@/loader/database';
import { Connection, Repository } from 'typeorm';
import TransactionEntity from '@entity/transaction.entity';
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

describe('getMonthlyTransactions() Tests', () => {
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

  it('응답데이터의 aggregationByDate는 일자별 집계 데이터로 구성된다.', async () => {
    const transactionDetailsOfMonth = await transactionService.getTransactionDetailsOfMonth({
      uid: 1,
      year: 2020,
      month: 10,
    });

    const { aggregationByDate } = transactionDetailsOfMonth;
    const aggregationByDateMap = new Map(aggregationByDate);
    const { transactionDetailsByDate } = transactionDetailsOfMonth;

    transactionDetailsByDate.forEach(([date, transactions]) => {
      const { totalIn, totalOut } = transactions.reduce(
        (prevAggregate, transaction) => {
          if (transaction.isIncome) {
            return {
              ...prevAggregate,
              totalIn: prevAggregate.totalIn + transaction.amount,
            };
          }
          return {
            ...prevAggregate,
            totalOut: prevAggregate.totalOut + transaction.amount,
          };
        },
        { totalIn: 0, totalOut: 0 },
      );
      const aggregation = aggregationByDateMap.get(date);
      expect(aggregation).not.toBeNull();
      if (aggregation) {
        expect(aggregation.totalIn).toEqual(totalIn);
        expect(aggregation.totalOut).toEqual(totalOut);
      }
    });
  });

  it('응답데이터의 totalIn, totalOut은 일자별 집계 데이터의 합과 일치한다.', async () => {
    const transactionDetailsOfMonth = await transactionService.getTransactionDetailsOfMonth({
      uid: 1,
      year: 2020,
      month: 10,
    });

    const { aggregationByDate } = transactionDetailsOfMonth;
    let sumInOfDate = 0;
    let sumOutOfDate = 0;

    aggregationByDate.forEach(([date, aggregation]) => {
      sumInOfDate += aggregation.totalIn;
      sumOutOfDate += aggregation.totalOut;
    });

    expect(transactionDetailsOfMonth.totalIn).toEqual(sumInOfDate);
    expect(transactionDetailsOfMonth.totalOut).toEqual(sumOutOfDate);
  });

  it('응답데이터의 mostOutDate는 일자별 소비 집계가 가장 큰 날의 정보로 구성된다.', async () => {
    const transactionDetailsOfMonth = await transactionService.getTransactionDetailsOfMonth({
      uid: 1,
      year: 2020,
      month: 10,
    });

    const { aggregationByDate } = transactionDetailsOfMonth;
    let mostAmount = 0;
    let mostOutDate = 0;

    aggregationByDate.forEach(([date, aggregation]) => {
      const totalOutOfDate = aggregation.totalOut;
      if (mostAmount < totalOutOfDate) {
        mostAmount = totalOutOfDate;
        mostOutDate = date;
      }
    });

    const { mostOutDateDetail } = transactionDetailsOfMonth;

    expect(mostOutDateDetail.date).toEqual(mostOutDate);
    expect(mostOutDateDetail.amount).toEqual(mostAmount);
  });
});
