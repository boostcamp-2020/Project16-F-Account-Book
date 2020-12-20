import Router from 'koa-router';
import { Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import UserRepository from '@/domain/user/user.repository';
import TransactionRepository from '@/domain/transaction/transaction.repository';
import { monthQueryValidator } from '@/middleware/validator';
import FixedExpenditureService from './fixed-expenditure.service';
import FixedExpenditureRepository from './fixed-expenditure.repository';

export default class FixedExpenditureRouter extends Router {
  private fixedExpenditureService;

  constructor() {
    super();
    this.fixedExpenditureService = new FixedExpenditureService(
      FixedExpenditureRepository.getFixedExpenditureRepository(),
      UserRepository.getUserRepository(),
      getCustomRepository(TransactionRepository),
    );
  }

  initRouter(): void {
    this.get('/', monthQueryValidator, async (ctx: Context) => {
      const { uid, updateAt } = ctx.state.user;
      const { year, month } = ctx.query;
      const fixedList = await this.fixedExpenditureService.getFixedExpenditure(
        uid,
        new Date(updateAt),
        year,
        Number(month) - 1,
      );
      ctx.body = fixedList;
    });
  }
}
