import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { MonthTransactionsResponse, TransactionModel } from '@/commons/types/transaction';
import TransactionRequestDTO from '@/commons/dto/transaction-request';
import transactionCache from '@/libs/cache/transactionCache';
import DateUtils from '@/libs/dateUtils';

const transactionAPI = {
  getMonthlyTransaction: async ({
    year,
    month,
  }: {
    year: number;
    month: number;
  }): Promise<MonthTransactionsResponse> => {
    const cachedData = transactionCache.get({ year, month });
    if (cachedData) {
      return cachedData;
    }
    const monthlyTransactionDetails = await axios.get<TransactionModel[]>(
      `${endpoints.TRANSACTION_API}?year=${year}&month=${month}`,
    );
    transactionCache.set({ date: { year, month }, list: monthlyTransactionDetails });
    return { date: { year, month }, list: monthlyTransactionDetails };
  },

  postTransaction: async (data: TransactionRequestDTO): Promise<TransactionModel> => {
    const newTransaction = await axios.post<TransactionModel>(endpoints.TRANSACTION_API, {
      ...data,
    });
    const { year, month } = DateUtils.parseDate(newTransaction.tradeAt);
    transactionCache.clear({ year, month });
    return newTransaction;
  },

  updateTransaction: async (data: TransactionRequestDTO): Promise<TransactionModel> => {
    const updatedTransaction = await axios.patch<TransactionModel>(
      `${endpoints.TRANSACTION_API}/${data.tid}`,
      {
        ...data,
      },
    );
    const { year, month } = DateUtils.parseDate(updatedTransaction.tradeAt);
    transactionCache.clear({ year, month });
    return updatedTransaction;
  },

  deleteTransaction: async (tid: number): Promise<TransactionModel> => {
    const deletedTransaction = await axios.delete<TransactionModel>(
      `${endpoints.TRANSACTION_API}/${tid}`,
    );
    const { year, month } = DateUtils.parseDate(deletedTransaction.tradeAt);
    transactionCache.clear({ year, month });
    return deletedTransaction;
  },
};

export default transactionAPI;
