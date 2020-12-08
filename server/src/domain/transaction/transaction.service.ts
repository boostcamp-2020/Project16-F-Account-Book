/* eslint-disable class-methods-use-this */
import TranscationEntity from '@/entity/transaction.entity';
import { Repository, Between } from 'typeorm';
import { BAD_REQUEST, DATABASE_ERROR } from '@/common/error';
import { Transactional } from 'typeorm-transactional-cls-hooked';
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
      order: { tradeAt: 'DESC' },
    });

    return transactions;
  }

  @Transactional()
  public async createTransaction(data: TransactionFormData): Promise<TranscationEntity> {
    const transaction = this.transactionRepository.create(data);
    const { tid } = await this.transactionRepository.save(transaction);
    const newTransaction = await this.transactionRepository.findOne({
      where: { tid },
      relations: ['payment', 'category'],
    });
    if (!newTransaction) {
      throw new Error(DATABASE_ERROR);
    }
    return newTransaction;
  }

  @Transactional()
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
    await this.transactionRepository.save(mergedTransaction);
    const updatedTransaction = await this.transactionRepository.findOne({
      where: { tid },
      relations: ['payment', 'category'],
    });
    if (!updatedTransaction) {
      throw new Error(DATABASE_ERROR);
    }
    return updatedTransaction;
  }

  @Transactional()
  public async deleteTransaction(tid: number, uid: number): Promise<TransactionDetail> {
    const transaction = await this.transactionRepository.findOne({ where: { tid, uid } });
    if (!transaction) throw new Error(BAD_REQUEST);
    await this.transactionRepository.delete(transaction);
    return transaction;
  }
}
