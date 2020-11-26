import Router from 'koa-router';
import AuthRouter from 'auth/auth.router';
import TransactionRouter from 'transaction/transaction.router';
import jwtAuthorize from '../middleware/jwt-authorize';

const apiRouter = new Router();

apiRouter.use('/auth', AuthRouter.routes());
apiRouter.use('/transactions', jwtAuthorize, TransactionRouter.routes());

export default apiRouter;
