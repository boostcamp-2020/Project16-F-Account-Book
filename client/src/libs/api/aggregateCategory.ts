import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { AggregateData } from '@/commons/types/aggregateCategory';

const aggregateCategoryAPI = {
  getAggregateCategory: async (startDate: string, endDate: string): Promise<AggregateData> => {
    const aggregateCategory = await axios.get<AggregateData>(
      `${endpoints.AGGREGATE_CATEGORY_api}/category?start=${startDate}&end=${endDate}`,
    );
    return aggregateCategory;
  },
};

export default aggregateCategoryAPI;
