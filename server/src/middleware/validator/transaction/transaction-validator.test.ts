import BadRequest from '@/common/error/bad-request';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { fail } from 'assert';
import transactionValidator from '.';

const mockNext = jest.fn(() => Promise.resolve());
const mockBody = {
  pid: 1,
  cid: 1,
  description: 'mock transaction',
  tradeAt: '2020-12-19',
  amount: 3000,
  isIncome: false,
};

afterEach(() => {
  mockNext.mockClear();
});

it('pid가 null이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, pid: null };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('pid가 number가 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, pid: 'string' };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('pid가 1보다 작으면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, pid: 0 };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('cid가 null이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, cid: null };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('cid가 number가 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, cid: 'string' };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('cid가 0이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, cid: 0 };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('cid가 1보다 작으면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, cid: 0 };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('description이 null이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, description: null };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('description이 string이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, description: 1 };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('description이 string이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, description: { text: 'string' } };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('tradeAt이 null이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, tradeAt: null };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('tradeAt이 DateString 포맷이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, tradeAt: 'not date string' };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('tradeAt이 yyyy-MM-dd 포맷이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, tradeAt: '2021.01.12' };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('amount가 null이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, amount: null };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('amount가 number가 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, amount: 'string' };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('amount가 음수이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, amount: null };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('isIncome이 null이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, isIncome: null };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('isIncome이 boolean 타입이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, isIncome: 'string' };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('isIncome이 boolean 타입이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, isIncome: 1 };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('isIncome이 boolean 타입이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, isIncome: 0 };
    await transactionValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('모든 property의 예외처리가 통과하면 next가 실행된다', async () => {
  const ctx = createMockContext();

  ctx.body = { ...mockBody };
  await transactionValidator(ctx, mockNext);
  expect(mockNext).toBeCalledTimes(1);
});
