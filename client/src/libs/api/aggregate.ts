import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import {
  AggregateCategoryData,
  MostSpendingCategory,
  OverspendingIndexDetail,
} from '@/commons/types/aggregate';

const aggregateAPI = {
  getOverspendingIndex: async (year: number, month: number): Promise<OverspendingIndexDetail> => {
    const response = await axios.get(endpoints.GET_OVERSPENDING_INDEX_API, {
      params: { year, month },
    });
    return response;
  },

  getMostSpendingCategory: async (year: number, month: number): Promise<MostSpendingCategory> => {
    const response = await axios.get(endpoints.GET_MOST_SPENDING_CATEGORY_API, {
      params: { year, month },
    });
    return response;
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
