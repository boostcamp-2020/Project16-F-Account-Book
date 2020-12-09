import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';

const aggregateAPI = {
  getOverspendingIndex: async (
    year: number,
    month: number,
  ): Promise<{
    overspendingIndex: number;
    averageIncome: number;
    expenditureThisMonth: number;
  }> => {
    const response = await axios.get(endpoints.GET_OVERSPENDING_INDEX_API, {
      params: { year, month },
    });
    return response;
  },
  getMostSpendingCategory: async (
    year: number,
    month: number,
  ): Promise<{
    name: string;
    aggregate: string;
  }> => {
    const response = await axios.get(endpoints.GET_MOST_SPENDING_CATEGORY_API, {
      params: { year, month },
    });
    return response;
  },
};

export default aggregateAPI;
