import Router from 'koa-router';
import { Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import TransactionRepository from '@/domain/transaction/transaction.repository';
import AggregateService from './aggregate.service';

export default class AggregateRouter extends Router {
  private aggregateService;

  constructor() {
    super();
    this.aggregateService = new AggregateService(getCustomRepository(TransactionRepository));
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

    this.get('/max-category', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const maxCategory = await this.aggregateService.getMaxCategory(uid);

      ctx.body = maxCategory;
    });

    this.get('/overspending-index', async (ctx: Context) => {
      const { user } = ctx.state;
      const overspendingIndexInfo = await this.aggregateService.getOverspendingIndex(user);
      ctx.body = overspendingIndexInfo;
    });
  }
}
