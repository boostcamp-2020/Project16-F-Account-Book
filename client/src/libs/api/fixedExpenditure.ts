import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { FixedExpenditure } from '@/commons/types/fixedExpenditure';

const fixedExpenditureAPI = {
  getFixedExpenditure: async (startDate: string, endDate: string): Promise<FixedExpenditure[]> => {
    const fixedExpenditure = await axios.get<FixedExpenditure[]>(
      `${endpoints.FIXED_EXPENDITURE_API}?start=${startDate}&end=${endDate}`,
    );
    return fixedExpenditure;
  },
};

export default fixedExpenditureAPI;
