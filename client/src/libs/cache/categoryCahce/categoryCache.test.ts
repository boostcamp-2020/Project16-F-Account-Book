import categoryCache from '.';

const mockResponse = [
  { cid: 1, name: '식비', isIncome: false, uid: 1 },
  { cid: 2, name: '교통', isIncome: false, uid: 1 },
];

afterEach(() => {
  categoryCache.clear();
});

it('응답데이터 캐싱 테스트', () => {
  categoryCache.set(mockResponse);
  expect(categoryCache.get().length).toBe(2);
});

it('캐시 clear 테스트', () => {
  categoryCache.set(mockResponse);
  expect(categoryCache.get().length).toBe(2);

  categoryCache.clear();
  expect(categoryCache.get().length).toBe(0);
});

it('반환 데이터 immutable 테스트', () => {
  categoryCache.set(mockResponse);
  const cachedData = categoryCache.get();

  categoryCache.clear();
  expect(categoryCache.get().length).toBe(0);
  expect(cachedData.length).toBe(2);
});
