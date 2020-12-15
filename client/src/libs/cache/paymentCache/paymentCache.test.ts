import paymentCache from '.';

const mockResponse = [
  { pid: 1, name: '신한카드', uid: 1 },
  { pid: 2, name: '네이버페이', uid: 1 },
];

afterEach(() => {
  paymentCache.clear();
});

it('응답데이터 캐싱 테스트', () => {
  paymentCache.set(mockResponse);
  expect(paymentCache.get().length).toBe(2);
});

it('캐시 clear 테스트', () => {
  paymentCache.set(mockResponse);
  expect(paymentCache.get().length).toBe(2);

  paymentCache.clear();
  expect(paymentCache.get().length).toBe(0);
});

it('반환 데이터 immutable 테스트', () => {
  paymentCache.set(mockResponse);
  const cachedData = paymentCache.get();

  paymentCache.clear();
  expect(paymentCache.get().length).toBe(0);
  expect(cachedData.length).toBe(2);
});
