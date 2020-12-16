import { fail } from 'assert';
import { mockAggregateCategoryData } from '@/commons/mockData';
import aggregateCategoryDataCache from '.';

it('응답데이터 캐싱 테스트', () => {
  const date = { year: 2020, month: 12 };
  aggregateCategoryDataCache.set({ date, aggregateCategoryData: mockAggregateCategoryData });
  const cachedData = aggregateCategoryDataCache.get(date);
  if (!cachedData) {
    fail('캐시되지 않음');
  }
  expect(cachedData).not.toBeUndefined();
});

it('캐시가 가득 찼을때 가장 먼 날짜의 데이터를 삭제하고 캐싱된다', () => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = 2019;
  months.forEach((month) => {
    aggregateCategoryDataCache.set({
      date: { year, month },
      aggregateCategoryData: mockAggregateCategoryData,
    });
  });
  expect(aggregateCategoryDataCache.get({ year: 2019, month: 1 })).not.toBeUndefined();
  const date = { year: 2020, month: 12 };
  aggregateCategoryDataCache.set({ date, aggregateCategoryData: mockAggregateCategoryData });
  const cachedData = aggregateCategoryDataCache.get(date);
  expect(cachedData).not.toBeUndefined();
  expect(aggregateCategoryDataCache.get({ year: 2019, month: 1 })).toBeUndefined();
});

it('캐시 clear 테스트', () => {
  const date = { year: 2020, month: 12 };
  aggregateCategoryDataCache.set({ date, aggregateCategoryData: mockAggregateCategoryData });
  expect(aggregateCategoryDataCache.get(date)).not.toBeUndefined();
  aggregateCategoryDataCache.clear(date);
  expect(aggregateCategoryDataCache.get(date)).toBeUndefined();
});

it('반환 데이터 immutable 테스트', () => {
  const date = { year: 2020, month: 12 };
  aggregateCategoryDataCache.set({ date, aggregateCategoryData: mockAggregateCategoryData });
  const cachedData = aggregateCategoryDataCache.get(date);
  aggregateCategoryDataCache.clear(date);
  expect(aggregateCategoryDataCache.get(date)).toBeUndefined();
  expect(cachedData).not.toBeUndefined();
});
