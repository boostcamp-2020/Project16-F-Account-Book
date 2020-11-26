import Router from 'koa-router';
import { Context } from 'koa';
import FixedExpenditureService from './fixed-expenditure';

const router = new Router();

router.get('/', async (ctx: Context) => {
  const { uid } = ctx.state.user;
  const fixedList = await FixedExpenditureService.getFixedExpenditure(uid);

  ctx.body = fixedList;
});

export default router;
