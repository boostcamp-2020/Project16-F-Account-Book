import BadRequest from '@/common/error/bad-request';
import { createMockContext } from '@shopify/jest-koa-mocks';
import { fail } from 'assert';
import paymentValidator from '.';

const mockBody = {
  name: '테스트',
};
const mockNext = jest.fn(() => Promise.resolve());

afterEach(() => {
  mockNext.mockClear();
});

it('name이 null이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, name: null };
    await paymentValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('name이 string이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, name: 1 };
    await paymentValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('name이 string이 아니면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, name: { text: 'string' } };
    await paymentValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('name의 길이가 0이면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, name: '' };
    await paymentValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('name의 길이가 10보다 크면 BadResquest Error가 던져진다', async () => {
  const ctx = createMockContext();
  try {
    ctx.body = { ...mockBody, name: '01234568901' };
    await paymentValidator(ctx, mockNext);
    fail();
  } catch (err) {
    expect(err.constructor).toEqual(BadRequest);
  }
});

it('모든 property의 예외처리가 통과하면 next가 실행된다', async () => {
  const ctx = createMockContext();

  ctx.body = { ...mockBody };
  await paymentValidator(ctx, mockNext);
  expect(mockNext).toBeCalledTimes(1);
});
