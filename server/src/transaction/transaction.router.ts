import Router from 'koa-router';
import { Context } from 'koa';
import TransactionService from './transaction.service';
import TransactionRepository from './transaction.repository';

class TransactionRouter extends Router {
  transactionService;

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

export default TransactionRouter;
