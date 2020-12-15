import { fail } from 'assert';
import mostSpendingCategoryCache from '.';

const mockMostSpendingCategory = {
  name: 'category',
  aggregate: '20000',
};

it('응답데이터 캐싱 테스트', () => {
  const date = { year: 2020, month: 12 };
  mostSpendingCategoryCache.set({ date, mostSpendingCategory: mockMostSpendingCategory });
  const cachedData = mostSpendingCategoryCache.get(date);
  if (!cachedData) {
    fail('캐시되지 않음');
  }
  expect(cachedData).not.toBeUndefined();
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
