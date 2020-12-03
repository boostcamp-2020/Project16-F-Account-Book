import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import {
  MonthTransactionsResponse,
  PostTransactionRequest,
  TransactionModel,
} from '@/commons/types/transaction';

const transactionAPI = {
  getMonthlyTransaction: async ({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<MonthTransactionsResponse> => {
    const monthlyTransactionDetails = await axios.get<MonthTransactionsResponse>(
      `${endpoints.TRANSACTION_API}?year=${year}&month=${month + 1}`,
    );

    return monthlyTransactionDetails;
  },

  postTransaction: async (data: PostTransactionRequest): Promise<TransactionModel> => {
    const newTransaction = await axios.post<TransactionModel>(endpoints.TRANSACTION_API, {
      ...data,
    });

    return newTransaction;
  },
};

export default transactionAPI;
