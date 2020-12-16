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

it('캐시가 가득 찼을때 가장 먼 날짜의 데이터를 삭제하고 캐싱된다', () => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = 2019;
  months.forEach((month) => {
    overspendingIndexCache.set({
      date: { year, month },
      overspendingIndexDetail: mockOverspendingIndexDetail,
    });
  });
  expect(overspendingIndexCache.get({ year: 2019, month: 1 })).not.toBeUndefined();
  const date = { year: 2020, month: 12 };
  overspendingIndexCache.set({ date, overspendingIndexDetail: mockOverspendingIndexDetail });
  const cachedData = overspendingIndexCache.get(date);
  expect(cachedData).not.toBeUndefined();
  expect(overspendingIndexCache.get({ year: 2019, month: 1 })).toBeUndefined();
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
