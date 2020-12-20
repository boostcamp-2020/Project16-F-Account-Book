import { YearMonthModel } from '@/commons/types/date';
import { MostSpendingCategory } from '@/commons/types/aggregate';
import CacheUtils from '@/libs/cache/cacheUtils';
import constant from '@/libs/cache/constant';

const cache: Map<string, MostSpendingCategory> = new Map();

const set = ({
  date,
  mostSpendingCategory,
}: {
  date: YearMonthModel;
  mostSpendingCategory: MostSpendingCategory;
}): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  if (cache.size === constant.CACHE_MAX_SIZE) {
    const deleteKey = CacheUtils.getFarthestDateKey(dateKey, [...cache.keys()]);
    cache.delete(deleteKey);
  }
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
