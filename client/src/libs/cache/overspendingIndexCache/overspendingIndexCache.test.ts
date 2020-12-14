import { fail } from 'assert';
import overspendingIndexCache from '.';

const mockOverspendingIndexDetail = {
  overspendingIndex: 0.7,
  averageIncome: 100,
  expenditureThisMonth: 70,
};

it('응답데이터 캐싱 테스트', () => {
  const date = { year: 2020, month: 12 };
  overspendingIndexCache.set({ date, overspendingIndexDetail: mockOverspendingIndexDetail });
  const cachedData = overspendingIndexCache.get(date);
  if (!cachedData) {
    fail('캐시되지 않음');
  }
  expect(cachedData).not.toBeUndefined();
});

it('캐시 clear 테스트', () => {
  const date = { year: 2020, month: 12 };
  overspendingIndexCache.set({ date, overspendingIndexDetail: mockOverspendingIndexDetail });
  expect(overspendingIndexCache.get(date)).not.toBeUndefined();
  overspendingIndexCache.clear(date);
  expect(overspendingIndexCache.get(date)).toBeUndefined();
});

it('반환 데이터 immutable 테스트', () => {
  const date = { year: 2020, month: 12 };
  overspendingIndexCache.set({ date, overspendingIndexDetail: mockOverspendingIndexDetail });
  const cachedData = overspendingIndexCache.get(date);
  overspendingIndexCache.clear(date);
  expect(overspendingIndexCache.get(date)).toBeUndefined();
  expect(cachedData).not.toBeUndefined();
});
