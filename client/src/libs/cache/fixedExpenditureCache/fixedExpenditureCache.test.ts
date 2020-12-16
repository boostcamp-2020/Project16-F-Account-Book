import { fail } from 'assert';
import fixedExpenditureCache from '.';

const mockFixedExpenditure = {
  paid: [
    {
      fid: 1,
      tradeAt: new Date(),
      amount: 10000,
      description: 'mockPaid1',
    },
    {
      fid: 2,
      tradeAt: new Date(),
      amount: 20000,
      description: 'mockPaid2',
    },
  ],
  estimated: [
    {
      fid: 3,
      tradeAt: new Date(),
      amount: 10000,
      description: 'mockEstimated1',
    },
  ],
};

it('응답데이터 캐싱 테스트', () => {
  const date = { year: 2020, month: 12 };
  fixedExpenditureCache.set({ date, fixedExpenditure: mockFixedExpenditure });
  const cachedData = fixedExpenditureCache.get(date);
  if (!cachedData) {
    fail('캐시되지 않음');
  }
  expect(cachedData).not.toBeUndefined();
});

it('캐시가 가득 찼을때 가장 먼 날짜의 데이터를 삭제하고 캐싱된다', () => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = 2019;
  months.forEach((month) => {
    fixedExpenditureCache.set({
      date: { year, month },
      fixedExpenditure: mockFixedExpenditure,
    });
  });
  expect(fixedExpenditureCache.get({ year: 2019, month: 1 })).not.toBeUndefined();
  const date = { year: 2020, month: 12 };
  fixedExpenditureCache.set({ date, fixedExpenditure: mockFixedExpenditure });
  const cachedData = fixedExpenditureCache.get(date);
  expect(cachedData).not.toBeUndefined();
  expect(fixedExpenditureCache.get({ year: 2019, month: 1 })).toBeUndefined();
});

it('캐시 clear 테스트', () => {
  const date = { year: 2020, month: 12 };
  fixedExpenditureCache.set({ date, fixedExpenditure: mockFixedExpenditure });
  expect(fixedExpenditureCache.get(date)).not.toBeUndefined();
  fixedExpenditureCache.clear(date);
  expect(fixedExpenditureCache.get(date)).toBeUndefined();
});

it('반환 데이터 immutable 테스트', () => {
  const date = { year: 2020, month: 12 };
  fixedExpenditureCache.set({ date, fixedExpenditure: mockFixedExpenditure });
  const cachedData = fixedExpenditureCache.get(date);
  fixedExpenditureCache.clear(date);
  expect(fixedExpenditureCache.get(date)).toBeUndefined();
  expect(cachedData).not.toBeUndefined();
});
