import Router from 'koa-router';
import { Context } from 'koa';
import FixedExpenditureService from './fixed-expenditure.service';
import FixedExpenditureRepository from './fixed-expenditure.repository';
import TransactionRepository from '../transaction/transaction.repository';
import UserRepository from '../user/user.repository';

class FixedExpenditureRouter extends Router {
  fixedExpenditureService;

  constructor() {
    super();
    this.fixedExpenditureService = new FixedExpenditureService(
      FixedExpenditureRepository.getFixedExpenditureRepository(),
      UserRepository.getUserRepository(),
      TransactionRepository.getTransactionRepository(),
    );
  }

  initRouter(): void {
    this.get('/', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const fixedList = await this.fixedExpenditureService.getFixedExpenditure(uid);

      ctx.body = fixedList;
    });
  }
}
export default FixedExpenditureRouter;
