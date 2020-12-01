import Router from 'koa-router';
import TransactionRouter from '@/domain/transaction/transaction.router';
import AuthRouter from '@/domain/auth/auth.router';
import FixedExpenditureRouter from '@/domain/fixed-expenditure/fixed-expenditure.router';
import CategoryRouter from '@/domain/category/category.router';
import PaymentRouter from '@/domain/payment/payment.router';
import AggregateRouter from '@/domain/aggregate/aggregate.router';
import jwtAuthorize from '@/middleware/jwt-authorize';

class ApiRouter extends Router {
  private transactionRouter;

  private authRouter;

  private fixedExpenditureRouter;

  private categoryRouter;

  private paymentRouter;

  private aggregateRouter;

  constructor() {
    super();

    this.transactionRouter = new TransactionRouter();
    this.authRouter = new AuthRouter();
    this.fixedExpenditureRouter = new FixedExpenditureRouter();
    this.categoryRouter = new CategoryRouter();
    this.paymentRouter = new PaymentRouter();
    this.aggregateRouter = new AggregateRouter();

    this.transactionRouter.initRouter();
    this.authRouter.initRouter();
    this.fixedExpenditureRouter.initRouter();
    this.categoryRouter.initRouter();
    this.paymentRouter.initRouter();
    this.aggregateRouter.initRouter();
  }

  initRouter(): void {
    this.use('/auth', this.authRouter.routes());
    this.use(jwtAuthorize);
    this.use('/transactions', this.transactionRouter.routes());
    this.use('/fixed-expenditure', this.fixedExpenditureRouter.routes());
    this.use('/categories', this.categoryRouter.routes());
    this.use('/payment-methods', this.paymentRouter.routes());
    this.use('/aggregate', this.aggregateRouter.routes());
  }
}

export default ApiRouter;
