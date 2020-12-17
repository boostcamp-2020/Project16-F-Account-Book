import { mockPayments } from '@/commons/mockData';
import paymentCache from '.';

afterEach(() => {
  paymentCache.clear();
});

it('응답데이터 캐싱 테스트', () => {
  paymentCache.set(mockPayments);
  expect(paymentCache.get().length).toBe(2);
});

it('캐시 clear 테스트', () => {
  paymentCache.set(mockPayments);
  expect(paymentCache.get().length).toBe(2);

  paymentCache.clear();
  expect(paymentCache.get().length).toBe(0);
});

it('반환 데이터 immutable 테스트', () => {
  paymentCache.set(mockPayments);
  const cachedData = paymentCache.get();

  paymentCache.clear();
  expect(paymentCache.get().length).toBe(0);
  expect(cachedData.length).toBe(2);
});
