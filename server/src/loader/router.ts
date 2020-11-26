import Router from 'koa-router';
import TransactionRouter from '@/transaction/transaction.router';
import AuthRouter from 'auth/auth.router';
import FixedExpenditureRouter from '@/fixedExpenditure/fixed-expenditure.router';
import jwtAuthorize from '../middleware/jwt-authorize';

class ApiRouter extends Router {
  transactionRouter;
  
  authRouter;
  
  fixedExpenditureRouter;
  
  constructor() {
    super();
    this.transactionRouter = new TransactionRouter();
    this.transactionRouter.initRouter();
    this.authRouter = AuthRouter;
    this.fixedExpenditureRouter = FixedExpenditureRouter;
  }

  initRouter(): void {
    this.use('/auth', AuthRouter.routes());
    this.use(jwtAuthorize);
    this.use('/transactions', this.transactionRouter.routes());
    this.use('/fixed-expenditure', this.fixedExpenditureRouter.routes());
  }
}

export default ApiRouter;
