import BadRequest from '@/common/error/bad-request';
import { Context, Next } from 'koa';
import { notNull, isBoolean, isString } from '@/lib/validator/core';

export const validateIsIncome = (isIncome: any): boolean => {
  if (notNull(isIncome) && isBoolean(isIncome)) {
    return true;
  }
  throw new BadRequest('isIncome must be boolean');
};

export const validateName = (name: any): boolean => {
  if (notNull(name) && isString(name) && name.length > 0 && name.length <= 10) {
    return true;
  }
  throw new BadRequest('name must be string (min:1, max:10)');
};

const validate = async (ctx: Context, next: Next): Promise<void> => {
  const { body } = ctx.request;
  const { isIncome, name } = body;

  validateIsIncome(isIncome);
  validateName(name);

  await next();
};

export default validate;
