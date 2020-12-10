import { YearMonthModel } from '@/commons/types/date';
import { Interface } from 'readline';

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
