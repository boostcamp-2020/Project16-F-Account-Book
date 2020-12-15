import { YearMonthModel } from '@/commons/types/date';
import { MostSpendingCategory } from '@/commons/types/aggregate';
import CacheUtils from '@/libs/cache/cacheUtils';

const cache: Map<string, MostSpendingCategory> = new Map();

const set = ({
  date,
  mostSpendingCategory,
}: {
  date: YearMonthModel;
  mostSpendingCategory: MostSpendingCategory;
}): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  cache.set(dateKey, mostSpendingCategory);
};

const get = (date: YearMonthModel): MostSpendingCategory | undefined => {
  const dateKey = CacheUtils.makeDateKey(date);
  const mostSpendingCategory = cache.get(dateKey);
  if (mostSpendingCategory) {
    return { ...mostSpendingCategory };
  }
  return undefined;
};

const clear = (date: YearMonthModel): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  cache.delete(dateKey);
};

export default { set, get, clear };
