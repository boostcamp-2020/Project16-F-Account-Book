import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { MonthTransactionsResponse, TransactionModel } from '@/commons/types/transaction';
import TransactionRequestDTO from '@/commons/dto/transaction-request';

const transactionAPI = {
  getMonthlyTransaction: async ({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<MonthTransactionsResponse> => {
    const monthlyTransactionDetails = await axios.get<TransactionModel[]>(
      `${endpoints.TRANSACTION_API}?year=${year}&month=${month}`,
    );

    return { date: { year, month }, list: monthlyTransactionDetails };
  },

  postTransaction: async (data: TransactionRequestDTO): Promise<TransactionModel> => {
    const newTransaction = await axios.post<TransactionModel>(endpoints.TRANSACTION_API, {
      ...data,
    });

    return newTransaction;
  },

  updateTransaction: async (data: TransactionRequestDTO): Promise<TransactionModel> => {
    const updatedTransaction = await axios.patch<TransactionModel>(
      `${endpoints.TRANSACTION_API}/${data.tid}`,
      {
        ...data,
      },
    );
    return updatedTransaction;
  },

  deleteTransaction: async (tid: number): Promise<TransactionModel> => {
    const deletedTransaction = await axios.delete<TransactionModel>(
      `${endpoints.TRANSACTION_API}/${tid}`,
    );

    return deletedTransaction;
  },
};

export default transactionAPI;
