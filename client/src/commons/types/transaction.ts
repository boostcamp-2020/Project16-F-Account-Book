import { YearMonthModel } from '@/commons/types/date';

export type TransactionModel = {
  tid: number;
  amount: number;
  tradeAt: string;
  description: string;
  isIncome: boolean;
  uid: number;
  cid: number;
  pid: number;
  payment: {
    pid: number;
    name: string;
    uid: number;
  };
  category: {
    cid: number;
    name: string;
    isIncome: boolean;
    uid: number;
  };
};

export type MonthTransactionsResponse = { date: YearMonthModel; list: TransactionModel[] };

export type PostTransactionRequest = {
  amount: string;
  tradeAt: string;
  description: string;
  isIncome: string;
  cid: number;
  pid: number;
};
