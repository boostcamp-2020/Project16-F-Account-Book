import { YearMonthModel } from '@/commons/types/date';
import { TransactionModel } from '@/commons/types/transaction';
import CacheUtils from '@/libs/cache/cacheUtils';
import constant from '@/libs/cache/constant';

const cache: Map<string, TransactionModel[]> = new Map();

const set = ({ date, list }: { date: YearMonthModel; list: TransactionModel[] }): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  if (cache.size === constant.CACHE_MAX_SIZE) {
    const deleteKey = CacheUtils.getFarthestDateKey(dateKey, [...cache.keys()]);
    cache.delete(deleteKey);
  }
  cache.set(dateKey, list);
};

const get = (
  date: YearMonthModel,
): { date: YearMonthModel; list: TransactionModel[] } | undefined => {
  const dateKey = CacheUtils.makeDateKey(date);
  const list = cache.get(dateKey);
  if (list) {
    return { date, list: [...Array.from(list)] };
  }
  return undefined;
};

const clear = (date: YearMonthModel): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  cache.delete(dateKey);
};

export default { set, get, clear };
