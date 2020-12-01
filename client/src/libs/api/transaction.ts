import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { MonthTransactionsResponse } from '@/commons/types/transaction';

const transactionAPI = {
  getMonthTransactions: async ({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<MonthTransactionsResponse> => {
    const monthlyTransactionDetails = await axios.get<MonthTransactionsResponse>(
      `${endpoints.TRANSACTION_API}?year=${year}&month=${month}`,
    );
    return monthlyTransactionDetails;
  },
};

export default transactionAPI;
