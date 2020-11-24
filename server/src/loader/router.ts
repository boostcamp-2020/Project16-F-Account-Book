import AuthRouter from 'auth/auth.router';
import Router from 'koa-router';

const apiRouter = new Router();

apiRouter.use('/auth', AuthRouter.routes());

export default apiRouter;
