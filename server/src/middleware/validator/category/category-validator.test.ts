import BadRequest from '@/common/error/bad-request';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { fail } from 'assert';
import categoryValidator from '.';

const mockBody = {
  name: '테스트',
  isIncome: false,
};
const mockNext = jest.fn(() => Promise.resolve());

afterEach(() => {
  mockNext.mockClear();
});

it('name이 null이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, name: null };
    await categoryValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('name이 string이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, name: 1 };
    await categoryValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('name이 string이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, name: { text: 'string' } };
    await categoryValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('name의 길이가 0이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, name: '' };
    await categoryValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('name의 길이가 10보다 크면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, name: '01234568901' };
    await categoryValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('isIncome이 null이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, isIncome: null };
    await categoryValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('isIncome이 boolean 타입이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, isIncome: 'string' };
    await categoryValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('isIncome이 boolean 타입이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, isIncome: 1 };
    await categoryValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('isIncome이 boolean 타입이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, isIncome: 0 };
    await categoryValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('모든 property의 예외처리가 통과하면 next가 실행된다', async () => {
  const ctx = createMockContext();

  ctx.body = { ...mockBody };
  await categoryValidator(ctx, mockNext);
  expect(mockNext).toBeCalledTimes(1);
});
