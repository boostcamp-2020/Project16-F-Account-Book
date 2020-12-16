import { mockCategories } from '@/commons/mockData';
import categoryCache from '.';

afterEach(() => {
  categoryCache.clear();
});

it('응답데이터 캐싱 테스트', () => {
  categoryCache.set(mockCategories);
  expect(categoryCache.get().length).toBe(2);
});

it('캐시 clear 테스트', () => {
  categoryCache.set(mockCategories);
  expect(categoryCache.get().length).toBe(2);

  categoryCache.clear();
  expect(categoryCache.get().length).toBe(0);
});

it('반환 데이터 immutable 테스트', () => {
  categoryCache.set(mockCategories);
  const cachedData = categoryCache.get();

  categoryCache.clear();
  expect(categoryCache.get().length).toBe(0);
  expect(cachedData.length).toBe(2);
});
