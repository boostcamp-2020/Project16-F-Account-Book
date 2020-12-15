import BadRequest from '@/common/error/bad-request';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { fail } from 'assert';
import MonthQueryValidator from '.';

const mockNext = jest.fn(() => Promise.resolve());

afterEach(() => {
  mockNext.mockClear();
});

it('year가 4자리, month가 2자리 숫자형식으로 정상적으로 포함된 경우 next가 실행된다', async () => {
  const ctx = createMockContext({ url: '/api/mock?year=2020&month=12' });
  await MonthQueryValidator.validate(ctx, mockNext);
  expect(mockNext).toBeCalledTimes(1);
});

it('month가 1자리 숫자형식일때도 validation에 성공한다', async () => {
  const ctx = createMockContext({ url: '/api/mock?year=2020&month=1' });
  await MonthQueryValidator.validate(ctx, mockNext);
  expect(mockNext).toBeCalledTimes(1);
});

it('month가 0x 형식일때도 validation에 성공한다', async () => {
  const ctx = createMockContext({ url: '/api/mock?year=2020&month=01' });
  await MonthQueryValidator.validate(ctx, mockNext);
  expect(mockNext).toBeCalledTimes(1);
});

it('year가 1899년 이하이면 BadRequsetError가 던져진다', async () => {
  const ctx = createMockContext({ url: '/api/mock?year=1899&month=12' });
  try {
    await MonthQueryValidator.validate(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('year가 3001년 이상이면 BadRequsetError가 던져진다', async () => {
  const ctx = createMockContext({ url: '/api/mock?year=3001&month=12' });
  try {
    await MonthQueryValidator.validate(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('month가 0이하면 BadRequsetError가 던져진다', async () => {
  const ctx = createMockContext({ url: '/api/mock?year=2020&month=0' });
  try {
    await MonthQueryValidator.validate(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('month가 13이상이면 BadRequsetError가 던져진다', async () => {
  const ctx = createMockContext({ url: '/api/mock?year=2020&month=13' });
  try {
    await MonthQueryValidator.validate(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('year가 숫자 형식이 아닐때 BadRequsetError가 던져진다', async () => {
  const ctx = createMockContext({ url: '/api/mock?year=year&month=12' });
  try {
    await MonthQueryValidator.validate(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('month가 숫자 형식이 아닐때 BadRequsetError가 던져진다', async () => {
  const ctx = createMockContext({ url: '/api/mock?year=2020&month=month' });
  try {
    await MonthQueryValidator.validate(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});
