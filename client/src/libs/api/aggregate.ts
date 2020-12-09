import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';

const aggregateAPI = {
  getOverspendingIndex: async (): Promise<{
    overspendingIndex: number;
    averageIncome: number;
    expenditureThisMonth: number;
  }> => {
    const response = await axios.get(endpoints.GET_OVERSPENDING_INDEX_API);
    return response;
  },
  getMostSpendCategoryInfo: async (): Promise<{
    name: string;
    aggregate: string;
  }> => {
    const response = await axios.get(endpoints.GET_MOST_SPEND_CATEGORY_API);
    return response;
  },
};

export default aggregateAPI;
