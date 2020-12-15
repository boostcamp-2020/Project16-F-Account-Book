import { mockTransactions } from '@/libs/mockData';
import { fail } from 'assert';
import transactionCache from '.';

it('응답데이터 캐싱 테스트', () => {
  const date = { year: 2020, month: 12 };
  transactionCache.set({ date, list: mockTransactions });
  const cachedData = transactionCache.get(date);
  if (!cachedData) {
    fail('캐시되지 않음');
  }
  expect(cachedData.list.length).toBe(mockTransactions.length);
});

it('캐시 clear 테스트', () => {
  const date = { year: 2020, month: 12 };
  transactionCache.set({ date, list: mockTransactions });
  expect(transactionCache.get(date)).not.toBeUndefined();
  transactionCache.clear(date);
  expect(transactionCache.get(date)).toBeUndefined();
});

it('반환 데이터 immutable 테스트', () => {
  const date = { year: 2020, month: 12 };
  transactionCache.set({ date, list: mockTransactions });
  const cachedData = transactionCache.get(date);
  transactionCache.clear(date);
  expect(transactionCache.get(date)).toBeUndefined();
  expect(cachedData).not.toBeUndefined();
});
