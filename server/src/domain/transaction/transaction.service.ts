/* eslint-disable class-methods-use-this */
import TransactionRepository from '@/domain/transaction/transaction.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import DatabaseError from '@/common/error/database';
import NotFoundError from '@/common/error/not-found';
import dateUtils from '@/lib/date-utils';
import TranscationEntity from '@/entity/transaction.entity';
import {
  MonthlyTransactionDetailsQueryParams,
  TransactionDetail,
  TransactionFormData,
} from './types';

export default class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  public async getTransactionDetailsOfMonth({
    uid,
    year,
    month,
  }: MonthlyTransactionDetailsQueryParams): Promise<TransactionDetail[]> {
    const { startDate, endDate } = dateUtils.getStartDateAndEndDate(year, month);

    const transactions = await this.transactionRepository
      .query(`select t1.tid, t1.amount, t1.trade_at as tradeAt, t1.description, t1.is_income as isIncome, t1.uid, t1.cid, t1.pid, 
      (select name from payment p1 where p1.pid = t1.pid) as paymentName, 
      (select name from category c1 where c1.cid = t1.cid) as categoryName
      from transaction t1
      where t1.uid = ${uid} and t1.trade_at between '${startDate}' and '${endDate}'
      order by t1.trade_at DESC;`);

    return transactions;
  }

  private async getTransaction(tid: number): Promise<TransactionDetail> {
    const transaction = await this.transactionRepository.query(`
    select t1.tid, t1.amount, t1.trade_at as tradeAt, t1.description, t1.is_income as isIncome, t1.uid, t1.cid, t1.pid, 
    (select name from payment p1 where p1.pid = t1.pid) as paymentName, 
    (select name from category c1 where c1.cid = t1.cid) as categoryName
    from transaction t1
    where t1.tid = ${tid}`);
    return transaction;
  }

  @Transactional()
  public async createTransaction(data: TransactionFormData): Promise<TransactionDetail> {
    const transaction = this.transactionRepository.create(data);
    const { tid } = await this.transactionRepository.save(transaction);
    const newTransaction = await this.getTransaction(tid);
    if (!newTransaction) {
      throw new DatabaseError('Fail to create new transaction');
    }
    return newTransaction;
  }

  public async updateTransaction(
    tid: number,
    uid: number,
    data: TransactionFormData,
  ): Promise<TransactionDetail> {
    const { amount, tradeAt, description, isIncome, cid, pid } = data;
    const target = await this.transactionRepository.findOne({ where: { tid, uid } });

    if (!target) {
      throw new NotFoundError('Requested transaction resource does not exist');
    }
    const mergedTransaction = this.transactionRepository.merge(target, {
      amount,
      tradeAt: tradeAt.toString().slice(0, 10),
      description,
      isIncome,
      cid,
      pid,
    });
    await this.transactionRepository.save(mergedTransaction);
    const updatedTransaction = await this.getTransaction(tid);
    return updatedTransaction;
  }

  @Transactional()
  public async deleteTransaction(tid: number, uid: number): Promise<TranscationEntity> {
    const transaction = await this.transactionRepository.findOne({ where: { tid, uid } });

    if (!transaction) {
      throw new NotFoundError('Requested transaction resource does not exist');
    }
    await this.transactionRepository.delete(transaction);
    return transaction;
  }
}
