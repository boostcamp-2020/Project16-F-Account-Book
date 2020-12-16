import axios from '@/libs/axios';
import endpoints from '@/commons/endpoints';
import { FixedExpenditure } from '@/commons/types/fixedExpenditure';
import cache from '@/libs/cache/fixedExpenditureCache';

const fixedExpenditureAPI = {
  getFixedExpenditure: async (year: number, month: number): Promise<FixedExpenditure> => {
    const cachedData = cache.get({ year, month });
    if (cachedData) {
      return cachedData;
    }
    const fixedExpenditure = await axios.get<FixedExpenditure>(
      `${endpoints.FIXED_EXPENDITURE_API}?year=${year}&month=${month}`,
    );
    cache.set({ date: { year, month }, fixedExpenditure });
    return fixedExpenditure;
  },
};

export default fixedExpenditureAPI;
