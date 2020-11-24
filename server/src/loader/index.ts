import Koa, { Next } from 'koa';
import { Context } from 'vm';
import Router from 'koa-router';
import createDBConnection from './database';
import apiRouter from './router';

export default async (app: Koa<Koa.DefaultState, Koa.DefaultContext>): Promise<void> => {
  await createDBConnection();

  const router = new Router();

  app.use(async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = `message: ${err.message}`;
      console.log('Error handler:', err.message);
    }
  });

  router.use('/api', apiRouter.routes());
  app.use(router.routes()).use(router.allowedMethods());
};
