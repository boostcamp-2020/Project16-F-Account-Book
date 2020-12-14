import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import {
  AggregateCategoryData,
  MostSpendingCategory,
  OverspendingIndexDetail,
} from '@/commons/types/aggregate';
import MostSpendingCategoryCache from '@/libs/cache/mostSpendingCategoryCache';
import OverspendingIndexCache from '@/libs/cache/overspendingIndexCache';

const aggregateAPI = {
  getOverspendingIndex: async (year: number, month: number): Promise<OverspendingIndexDetail> => {
    const cachedData = OverspendingIndexCache.get({ year, month });
    if (cachedData) {
      return cachedData;
    }
    const overspendingIndexDetail = await axios.get(endpoints.GET_OVERSPENDING_INDEX_API, {
      params: { year, month },
    });
    OverspendingIndexCache.set({ date: { year, month }, overspendingIndexDetail });
    return overspendingIndexDetail;
  },

  getMostSpendingCategory: async (year: number, month: number): Promise<MostSpendingCategory> => {
    const cachedData = MostSpendingCategoryCache.get({ year, month });
    if (cachedData) {
      return cachedData;
    }
    const mostSpendingCategory = await axios.get(endpoints.GET_MOST_SPENDING_CATEGORY_API, {
      params: { year, month },
    });
    MostSpendingCategoryCache.set({ date: { year, month }, mostSpendingCategory });
    return mostSpendingCategory;
  },

  getAggregateCategory: async (
    startDate: string,
    endDate: string,
  ): Promise<AggregateCategoryData> => {
    const aggregateCategory = await axios.get<AggregateCategoryData>(
      endpoints.AGGREGATE_CATEGORY_API,
      {
        params: { start: startDate, end: endDate },
      },
    );
    return aggregateCategory;
  },
};

export default aggregateAPI;
