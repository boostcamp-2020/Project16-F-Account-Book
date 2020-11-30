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
    this.post('/', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      await this.transactionService.createTransaction({ ...ctx.request.body, uid });
      ctx.status = 200;
    });

    this.patch('/:transactionId', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { transactionId } = ctx.params;
      await this.transactionService.updateTransaction(transactionId, uid, ctx.request.body);
      ctx.status = 200;
    });
  }
}
