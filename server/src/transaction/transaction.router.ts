import Router from 'koa-router';
import { Context } from 'koa';
import TransactionService from './transaction.service';

const router = new Router();

router.get('/fixed', async (ctx: Context) => {
  const { uid } = ctx.state.user;
  const fixedList = await TransactionService.getFixedExpenditure(uid);
  console.log(fixedList);
  ctx.body = fixedList;
});

export default router;
