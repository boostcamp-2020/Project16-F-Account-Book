import Router from 'koa-router';
import { Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import TransactionRepository from '@/domain/transaction/transaction.repository';
import { monthQueryValidator } from '@/middleware/validator';
import AggregateService from './aggregate.service';

export default class AggregateRouter extends Router {
  private aggregateService;

  constructor() {
    super();
    this.aggregateService = new AggregateService(getCustomRepository(TransactionRepository));
  }

  initRouter(): void {
    this.get('/category', monthQueryValidator, async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { year, month } = ctx.query;
      const aggregateCategory = await this.aggregateService.getAggregateCategory(uid, year, month);

      ctx.body = aggregateCategory;
    });

    this.get('/max-category', monthQueryValidator, async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { year, month } = ctx.query;
      const maxCategory = await this.aggregateService.getMaxCategory(uid, year, month);

      ctx.body = maxCategory;
    });

    this.get('/overspending-index', monthQueryValidator, async (ctx: Context) => {
      const { user } = ctx.state;
      const { year, month } = ctx.query;
      const overspendingIndexInfo = await this.aggregateService.getOverspendingIndex(
        user,
        year,
        month,
      );
      ctx.body = overspendingIndexInfo;
    });
  }
}
