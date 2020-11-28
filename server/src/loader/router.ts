import Router from 'koa-router';
import TransactionRouter from '@/transaction/transaction.router';
import AuthRouter from 'auth/auth.router';
import FixedExpenditureRouter from '@/fixed-expenditure/fixed-expenditure.router';
import jwtAuthorize from '../middleware/jwt-authorize';

class ApiRouter extends Router {
  private transactionRouter;

  private authRouter;

  private fixedExpenditureRouter;

  constructor() {
    super();
    this.transactionRouter = new TransactionRouter();
    this.authRouter = new AuthRouter();
    this.fixedExpenditureRouter = new FixedExpenditureRouter();
    this.transactionRouter.initRouter();
    this.authRouter.initRouter();
    this.fixedExpenditureRouter.initRouter();
  }

  initRouter(): void {
    this.use('/auth', this.authRouter.routes());
    this.use(jwtAuthorize);
    this.use('/transactions', this.transactionRouter.routes());
    this.use('/fixed-expenditure', this.fixedExpenditureRouter.routes());
  }
}

export default ApiRouter;
