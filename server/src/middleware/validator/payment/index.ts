import BadRequest from '@/common/error/bad-request';
import { Context, Next } from 'koa';
import { notNull, isString } from '@/lib/validator/core';

export const validateName = (name: any): boolean => {
  if (notNull(name) && isString(name) && name.length > 0 && name.length <= 10) {
    return true;
  }
  throw new BadRequest('name must be string (min:1, max:10)');
};

const validate = async (ctx: Context, next: Next): Promise<void> => {
  const { body } = ctx;
  const { name } = body;

  validateName(name);

  await next();
};

export default validate;
