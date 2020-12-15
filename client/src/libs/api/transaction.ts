import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { MonthTransactionsResponse, TransactionModel } from '@/commons/types/transaction';
import TransactionRequestDTO from '@/commons/dto/transaction-request';
import transactionCache from '@/libs/cache/transactionCache';
import fixedExpenditureCache from '@/libs/cache/fixedExpenditureCache';
import MostSpendingCategoryCache from '@/libs/cache/mostSpendingCategoryCache';
import OverspendingIndexCache from '@/libs/cache/overspendingIndexCache';
import AggregateCategoryCache from '@/libs/cache/aggregateCategoryCache';
import DateUtils from '@/libs/dateUtils';
import { YearMonthModel } from '@/commons/types/date';

const clearCache = (date: YearMonthModel) => {
  transactionCache.clear(date);
  fixedExpenditureCache.clear(date);
  MostSpendingCategoryCache.clear(date);
  OverspendingIndexCache.clear(date);
  AggregateCategoryCache.clear(date);
};

const transactionAPI = {
  getMonthlyTransaction: async ({
    year,
    month,
  }: YearMonthModel): Promise<MonthTransactionsResponse> => {
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
    clearCache({ year, month });
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
    clearCache({ year, month });
    return updatedTransaction;
  },

  deleteTransaction: async (tid: number): Promise<TransactionModel> => {
    const deletedTransaction = await axios.delete<TransactionModel>(
      `${endpoints.TRANSACTION_API}/${tid}`,
    );
    const { year, month } = DateUtils.parseDate(deletedTransaction.tradeAt);
    clearCache({ year, month });
    return deletedTransaction;
  },
};

export default transactionAPI;
