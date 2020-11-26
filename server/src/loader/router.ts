import Router from 'koa-router';
import AuthRouter from 'auth/auth.router';
import FixedExpenditureRouter from '@/fixedExpenditure/fixed-expenditure.router';
import jwtAuthorize from '../middleware/jwt-authorize';

const apiRouter = new Router();

apiRouter.use('/auth', AuthRouter.routes());
apiRouter.use('/transactions', jwtAuthorize, FixedExpenditureRouter.routes());

export default apiRouter;
