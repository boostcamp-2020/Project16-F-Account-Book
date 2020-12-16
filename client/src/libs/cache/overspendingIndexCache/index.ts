import { YearMonthModel } from '@/commons/types/date';
import { OverspendingIndexDetail } from '@/commons/types/aggregate';
import CacheUtils from '@/libs/cache/cacheUtils';
import constant from '@/libs/cache/constant';

const cache: Map<string, OverspendingIndexDetail> = new Map();

const set = ({
  date,
  overspendingIndexDetail,
}: {
  date: YearMonthModel;
  overspendingIndexDetail: OverspendingIndexDetail;
}): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  if (cache.size === constant.CACHE_MAX_SIZE) {
    const deleteKey = CacheUtils.getFurthermostDateKey(dateKey, [...cache.keys()]);
    cache.delete(deleteKey);
  }
  cache.set(dateKey, overspendingIndexDetail);
};

const get = (date: YearMonthModel): OverspendingIndexDetail | undefined => {
  const dateKey = CacheUtils.makeDateKey(date);
  const overspendingIndexDetail = cache.get(dateKey);
  if (overspendingIndexDetail) {
    return { ...overspendingIndexDetail };
  }
  return undefined;
};

const clear = (date: YearMonthModel): void => {
  const dateKey = CacheUtils.makeDateKey(date);
  cache.delete(dateKey);
};

export default { set, get, clear };
