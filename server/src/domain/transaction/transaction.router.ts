import Router from 'koa-router';
import { Context } from 'koa';
import TransactionService from './transaction.service';
import TransactionRepository from './transaction.repository';

export default class TransactionRouter extends Router {
  private transactionService;

  constructor() {
    super();
    this.transactionService = new TransactionService(
      TransactionRepository.getTransactionRepository(),
    );
  }

  initRouter(): void {
    this.get('/', async (ctx: Context) => {
      const { query } = ctx;
      const { year, month } = query;
      const transactionDetailsOfMonth = await this.transactionService.getTransactionDetailsOfMonth({
        uid: ctx.state.user.uid,
        year,
        month,
      });
      ctx.status = 200;
      ctx.body = transactionDetailsOfMonth;
    });
  }
}
