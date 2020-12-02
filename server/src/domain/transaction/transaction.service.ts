/* eslint-disable class-methods-use-this */
import TranscationEntity from '@/entity/transaction.entity';
import { Repository, Between } from 'typeorm';
import { BAD_REQUEST } from '@/common/error';
import {
  MonthlyTransactionDetailsQueryParams,
  MonthlyTransactionDetails,
  TransactionDetail,
  AggregationByDateMap,
  TransactionDetailsByDateMap,
  MostOutDateDetail,
  TransactionFormData,
} from './types';

export default class TransactionService {
  private transactionRepository: Repository<TranscationEntity>;

  constructor(transactionRepository: Repository<TranscationEntity>) {
    this.transactionRepository = transactionRepository;
  }

  public async getTransactionDetailsOfMonth({
    uid,
    year,
    month,
  }: MonthlyTransactionDetailsQueryParams): Promise<MonthlyTransactionDetails> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const transactions = await this.transactionRepository.find({
      where: { uid, tradeAt: Between(startDate, endDate) },
      relations: ['payment', 'category'],
      order: { tradeAt: 'ASC' },
    });

    const transactionDetailsMap: TransactionDetailsByDateMap = this.groupByDate(transactions);
    const aggregationByDateMap: AggregationByDateMap = this.aggregateByDate(transactionDetailsMap);
    const integratedAggregation = this.aggregateIntegratedData(aggregationByDateMap);

    return {
      ...integratedAggregation,
      aggregationByDate: [...aggregationByDateMap.entries()],
      transactionDetailsByDate: [...transactionDetailsMap.entries()],
    };
  }

  private groupByDate(transactions: TranscationEntity[]) {
    const listByDate = new Map<number, TransactionDetail[]>();

    transactions.forEach((transaction) => {
      const tradeDate = new Date(transaction.tradeAt).getDate();
      const list = listByDate.get(tradeDate) || [];
      list.push(transaction);
      listByDate.set(tradeDate, list);
    });

    return listByDate;
  }

  private aggregateByDate(
    transactionDetailsMap: TransactionDetailsByDateMap,
  ): AggregationByDateMap {
    const aggregationByDate = new Map<number, { totalIn: number; totalOut: number }>();
    transactionDetailsMap.forEach((transactions: TransactionDetail[], tradeDate: number) => {
      const aggregateOfDate = transactions.reduce(
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
      aggregationByDate.set(tradeDate, aggregateOfDate);
    });

    return aggregationByDate;
  }

  private aggregateIntegratedData(aggregationByDateMap: AggregationByDateMap) {
    let totalIn = 0;
    let totalOut = 0;
    const mostOutDateDetail: MostOutDateDetail = {
      amount: 0,
      date: 1,
    };

    aggregationByDateMap.forEach((aggregation, date) => {
      totalIn += aggregation.totalIn;
      totalOut += aggregation.totalOut;
      if (mostOutDateDetail.amount < aggregation.totalOut) {
        mostOutDateDetail.amount = aggregation.totalOut;
        mostOutDateDetail.date = date;
      }
    });

    return { totalIn, totalOut, mostOutDateDetail };
  }

  public async createTransaction(data: TransactionFormData): Promise<TranscationEntity> {
    const transaction = this.transactionRepository.create(data);
    const newTransaction = await this.transactionRepository.save(transaction);
    return newTransaction;
  }

  public async updateTransaction(
    tid: number,
    uid: number,
    data: TransactionFormData,
  ): Promise<TransactionDetail> {
    const { amount, tradeAt, description, isIncome, cid, pid } = data;
    const target = await this.transactionRepository.findOne({ where: { tid, uid } });
    if (!target) throw new Error(BAD_REQUEST);
    const mergedTransaction = this.transactionRepository.merge(target, {
      amount,
      tradeAt,
      description,
      isIncome,
      cid,
      pid,
    });
    const updatedTransaction = await this.transactionRepository.save(mergedTransaction);
    return updatedTransaction;
  }

  public async deleteTransaction(tid: number, uid: number): Promise<TransactionDetail> {
    const transaction = await this.transactionRepository.findOne({ where: { tid, uid } });
    if (!transaction) throw new Error(BAD_REQUEST);
    await this.transactionRepository.delete(transaction);
    return transaction;
  }
}
