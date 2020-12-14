import { YearMonthModel } from '@/commons/types/date';
import { FixedExpenditure } from '@/commons/types/fixedExpenditure';
import CacheUtils from '@/libs/cache/cacheUtils';

const cache: Map<string, FixedExpenditure> = new Map();

const set = ({
  date,
  fixedExpenditures,
}: {
  date: YearMonthModel;
  fixedExpenditures: FixedExpenditure;
}): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  cache.set(dateKey, fixedExpenditures);
};

const get = (date: YearMonthModel): FixedExpenditure | undefined => {
  const dateKey = CacheUtils.makeDateKey(date);
  const fixedExpenditures = cache.get(dateKey);
  if (fixedExpenditures) {
    return { ...fixedExpenditures };
  }
  return undefined;
};

const clear = (date: YearMonthModel): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  cache.delete(dateKey);
};

export default { set, get, clear };
