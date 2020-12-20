import BadRequest from '@/common/error/bad-request';
import { Context, Next } from 'koa';
import {
  notNull,
  isNumber,
  isPositiveNumber,
  isDateString,
  isBoolean,
  isString,
} from '@/lib/validator/core';

const validatePid = (pid: any): boolean => {
  if (notNull(pid) && isNumber(pid) && isPositiveNumber(pid)) {
    return true;
  }
  throw new BadRequest('pid must be number(non-zero)');
};

const validateCid = (cid: any): boolean => {
  if (notNull(cid) && isNumber(cid) && isPositiveNumber(cid)) {
    return true;
  }
  throw new BadRequest('cid must be number(non-zero)');
};

const validateDescription = (description: any): boolean => {
  if (notNull(description) && isString(description)) {
    return true;
  }
  throw new BadRequest('description must be string');
};

const validateTradeAt = (tradeAt: any): boolean => {
  if (notNull(tradeAt) && isDateString(tradeAt)) {
    return true;
  }
  throw new BadRequest('tradeAt must be date string (yyyy-MM-dd)');
};

const validateIsIncome = (isIncome: any): boolean => {
  if (notNull(isIncome) && isBoolean(isIncome)) {
    return true;
  }
  throw new BadRequest('isIncome must be boolean');
};

const validateAmount = (amount: any): boolean => {
  if (notNull(amount) && isNumber(amount) && isPositiveNumber(amount)) {
    return true;
  }
  throw new BadRequest('amount must be number');
};

const validate = async (ctx: Context, next: Next): Promise<void> => {
  const { body } = ctx.request;
  const { pid, cid, description, tradeAt, isIncome, amount } = body;

  validatePid(pid);
  validateCid(cid);
  validateDescription(description);
  validateTradeAt(tradeAt);
  validateIsIncome(isIncome);
  validateAmount(amount);

  await next();
};

export default validate;
