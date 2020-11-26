import AuthRouter from 'auth/auth.router';
import Router from 'koa-router';
import TransactionRouter from '@/transaction/transaction.router';
import jwtAuthorize from '../middleware/jwt-authorize';

class ApiRouter extends Router {
  transactionRouter;

  authRouter;

  constructor() {
    super();
    this.transactionRouter = new TransactionRouter();
    this.transactionRouter.initRouter();
    this.authRouter = AuthRouter;
  }

  initRouter(): void {
    this.use('/auth', AuthRouter.routes());
    this.use(jwtAuthorize);
    this.use('/transactions', this.transactionRouter.routes());
  }
}

export default ApiRouter;
