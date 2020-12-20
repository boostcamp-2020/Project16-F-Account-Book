import BadRequest from '@/common/error/bad-request';
import { Context, Next } from 'koa';
import { notNull, isNumber } from '@/lib/validator/core';

const MIN_YEAR = 1900;
const MAX_YEAR = 3000;

const checkNotNull = (year: any, month: any) => {
  return notNull(year) && notNull(month);
};

const checkIsNumber = (year: any, month: any) => {
  return isNumber(year) && isNumber(month);
};

const checkRangeDate = (year: any, month: any) => {
  return year >= MIN_YEAR && year <= MAX_YEAR && month >= 1 && month <= 12;
};

const validate = async (ctx: Context, next: Next): Promise<void> => {
  const { query } = ctx.request;
  const { year, month } = query;

  if (
    !checkNotNull(year, month) ||
    !checkIsNumber(year, month) ||
    !checkRangeDate(Number(year), Number(month))
  ) {
    throw new BadRequest('Invalid query parameter');
  }

  await next();
};

export default validate;
