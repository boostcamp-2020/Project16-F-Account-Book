import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { FixedExpenditure } from '@/commons/types/fixedExpenditure';

const fixedExpenditureAPI = {
  getFixedExpenditure: async (year: number, month: number): Promise<FixedExpenditure[]> => {
    const fixedExpenditure = await axios.get<FixedExpenditure[]>(
      `${endpoints.FIXED_EXPENDITURE_API}?year=${year}&month=${month}`,
    );
    return fixedExpenditure;
  },
};

export default fixedExpenditureAPI;
