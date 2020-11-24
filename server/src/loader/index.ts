import Koa, { Next } from 'koa';
import { Context } from 'vm';
import createDBConnection from './database';

export default async (app: Koa<Koa.DefaultState, Koa.DefaultContext>): Promise<void> => {
  await createDBConnection();
  app.use(async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = 400;
      ctx.body = `message: ${err.message}`;
      console.log('Error handler:', err.message);
    }
  });
};
