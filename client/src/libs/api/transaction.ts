import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { MonthTransactionsResponse, PostTransactionRequest } from '@/commons/types/transaction';

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

  postTransaction: async (data: PostTransactionRequest) => {
    const newTransaction = await axios.post(
      `${endpoints.TRANSACTION_API}`,
      { ...data },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return newTransaction;
  },
};

export default transactionAPI;
