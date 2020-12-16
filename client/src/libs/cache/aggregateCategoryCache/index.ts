import { YearMonthModel } from '@/commons/types/date';
import { AggregateCategoryData } from '@/commons/types/aggregate';
import CacheUtils from '@/libs/cache/cacheUtils';
import constant from '@/libs/cache/constant';

const cache: Map<string, AggregateCategoryData> = new Map();

const set = ({
  date,
  aggregateCategoryData,
}: {
  date: YearMonthModel;
  aggregateCategoryData: AggregateCategoryData;
}): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  if (cache.size === constant.CACHE_MAX_SIZE) {
    const deleteKey = CacheUtils.getFurthermostDateKey(dateKey, [...cache.keys()]);
    cache.delete(deleteKey);
  }
  cache.set(dateKey, aggregateCategoryData);
};

const get = (date: YearMonthModel): AggregateCategoryData | undefined => {
  const dateKey = CacheUtils.makeDateKey(date);
  const aggregateCategoryData = cache.get(dateKey);
  if (aggregateCategoryData) {
    return { ...aggregateCategoryData };
  }
  return undefined;
};

const clear = (date: YearMonthModel): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  cache.delete(dateKey);
};

export default { set, get, clear };
