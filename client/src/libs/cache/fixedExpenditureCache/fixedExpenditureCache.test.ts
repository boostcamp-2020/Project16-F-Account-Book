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
  fixedExpenditureCache.set({ date, fixedExpenditures: mockFixedExpenditure });
  const cachedData = fixedExpenditureCache.get(date);
  if (!cachedData) {
    fail('캐시되지 않음');
  }
  expect(cachedData).not.toBeUndefined();
});

it('캐시 clear 테스트', () => {
  const date = { year: 2020, month: 12 };
  fixedExpenditureCache.set({ date, fixedExpenditures: mockFixedExpenditure });
  expect(fixedExpenditureCache.get(date)).not.toBeUndefined();
  fixedExpenditureCache.clear(date);
  expect(fixedExpenditureCache.get(date)).toBeUndefined();
});

it('반환 데이터 immutable 테스트', () => {
  const date = { year: 2020, month: 12 };
  fixedExpenditureCache.set({ date, fixedExpenditures: mockFixedExpenditure });
  const cachedData = fixedExpenditureCache.get(date);
  fixedExpenditureCache.clear(date);
  expect(fixedExpenditureCache.get(date)).toBeUndefined();
  expect(cachedData).not.toBeUndefined();
});
