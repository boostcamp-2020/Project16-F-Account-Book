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
  paymentName: string;
  categoryName: string;
};

export type MonthTransactionsResponse = { date: YearMonthModel; list: TransactionModel[] };

export interface TransactionReqeust {
  tid?: number;
  amount: string;
  tradeAt: string;
  description: string;
  isIncome: string;
  cid: number;
  pid: number;
}

export interface PostTransactionRequest extends TransactionReqeust {
  amount: string;
  tradeAt: string;
  description: string;
  isIncome: string;
  cid: number;
  pid: number;
}

export interface UpdateTransactionRequest extends TransactionReqeust {
  tid: number;
  amount: string;
  tradeAt: string;
  description: string;
  isIncome: string;
  cid: number;
  pid: number;
}
