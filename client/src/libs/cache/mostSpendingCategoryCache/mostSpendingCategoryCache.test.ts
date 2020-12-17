import { fail } from 'assert';
import { mockMostSpendingCategory } from '@/commons/mockData';
import mostSpendingCategoryCache from '.';

it('응답데이터 캐싱 테스트', () => {
  const date = { year: 2020, month: 12 };
  mostSpendingCategoryCache.set({ date, mostSpendingCategory: mockMostSpendingCategory });
  const cachedData = mostSpendingCategoryCache.get(date);
  if (!cachedData) {
    fail('캐시되지 않음');
  }
  expect(cachedData).not.toBeUndefined();
});

it('캐시가 가득 찼을때 가장 먼 날짜의 데이터를 삭제하고 캐싱된다', () => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = 2019;
  months.forEach((month) => {
    mostSpendingCategoryCache.set({
      date: { year, month },
      mostSpendingCategory: mockMostSpendingCategory,
    });
  });

  expect(mostSpendingCategoryCache.get({ year: 2019, month: 1 })).not.toBeUndefined();
  const date = { year: 2020, month: 12 };
  mostSpendingCategoryCache.set({ date, mostSpendingCategory: mockMostSpendingCategory });
  const cachedData = mostSpendingCategoryCache.get(date);
  expect(cachedData).not.toBeUndefined();
  expect(mostSpendingCategoryCache.get({ year: 2019, month: 1 })).toBeUndefined();
});

it('캐시 clear 테스트', () => {
  const date = { year: 2020, month: 12 };
  mostSpendingCategoryCache.set({ date, mostSpendingCategory: mockMostSpendingCategory });
  expect(mostSpendingCategoryCache.get(date)).not.toBeUndefined();
  mostSpendingCategoryCache.clear(date);
  expect(mostSpendingCategoryCache.get(date)).toBeUndefined();
});

it('반환 데이터 immutable 테스트', () => {
  const date = { year: 2020, month: 12 };
  mostSpendingCategoryCache.set({ date, mostSpendingCategory: mockMostSpendingCategory });
  const cachedData = mostSpendingCategoryCache.get(date);
  mostSpendingCategoryCache.clear(date);
  expect(mostSpendingCategoryCache.get(date)).toBeUndefined();
  expect(cachedData).not.toBeUndefined();
});
