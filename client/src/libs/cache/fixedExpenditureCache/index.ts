import { YearMonthModel } from '@/commons/types/date';
import { FixedExpenditure } from '@/commons/types/fixedExpenditure';
import CacheUtils from '@/libs/cache/cacheUtils';
import constant from '@/libs/cache/constant';

const cache: Map<string, FixedExpenditure> = new Map();

const set = ({
  date,
  fixedExpenditure,
}: {
  date: YearMonthModel;
  fixedExpenditure: FixedExpenditure;
}): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  if (cache.size === constant.CACHE_MAX_SIZE) {
    const deleteKey = CacheUtils.getFarthestDateKey(dateKey, [...cache.keys()]);
    cache.delete(deleteKey);
  }
  cache.set(dateKey, fixedExpenditure);
};

const get = (date: YearMonthModel): FixedExpenditure | undefined => {
  const dateKey = CacheUtils.makeDateKey(date);
  const fixedExpenditure = cache.get(dateKey);
  if (fixedExpenditure) {
    return { ...fixedExpenditure };
  }
  return undefined;
};

const clear = (date: YearMonthModel): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  cache.delete(dateKey);
};

export default { set, get, clear };
