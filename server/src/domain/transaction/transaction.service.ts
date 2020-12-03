/* eslint-disable class-methods-use-this */
import TranscationEntity from '@/entity/transaction.entity';
import { Repository, Between } from 'typeorm';
import { BAD_REQUEST } from '@/common/error';
import {
  MonthlyTransactionDetailsQueryParams,
  TransactionDetail,
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
  }: MonthlyTransactionDetailsQueryParams): Promise<TransactionDetail[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const transactions = await this.transactionRepository.find({
      where: { uid, tradeAt: Between(startDate, endDate) },
      relations: ['payment', 'category'],
      order: { tradeAt: 'ASC' },
    });

    return transactions;
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
