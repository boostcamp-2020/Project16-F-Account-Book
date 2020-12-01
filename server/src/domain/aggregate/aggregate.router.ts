import Router from 'koa-router';
import { Context } from 'koa';
import TransactionRepository from '@/domain/transaction/transaction.repository';
import AggregateService from './aggregate.service';

export default class AggregateRouter extends Router {
  private aggregateService;

  constructor() {
    super();
    this.aggregateService = new AggregateService(TransactionRepository.getTransactionRepository());
  }

  initRouter(): void {
    this.get('/category', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { start, end, income } = ctx.query;
      const aggregateCategory = await this.aggregateService.getAggregateCategory(
        start,
        end,
        income,
        uid,
      );

      ctx.body = aggregateCategory;
    });
  }
}
