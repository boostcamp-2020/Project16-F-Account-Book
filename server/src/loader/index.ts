import Koa, { Context, Next } from 'koa';
import Router from 'koa-router';
import morgan from 'koa-morgan';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import createDBConnection from './database';
import ApiRouter from './router';

export default async (app: Koa<Koa.DefaultState, Koa.DefaultContext>): Promise<void> => {
  await createDBConnection();

  const router = new Router();

  app.use(morgan('dev'));
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  app.use(async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status ? err.status : 400;
      ctx.body = `message: ${err.message}`;
      console.log('Error :', err.message);
    }
  });
  app.use(bodyParser());

  const apiRouter = new ApiRouter();
  apiRouter.initRouter();
  router.use('/api', apiRouter.routes());
  app.use(router.routes()).use(router.allowedMethods());
};
