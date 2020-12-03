import { YearMonthModel } from '@/commons/types/date';
import { TransactionModel } from '@/commons/types/transaction';
import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export type TransactionAction = ActionType<typeof actions>;

export type TransactionState = {
  loading: boolean;
  error: Error | null;
  date: YearMonthModel | null;
  totalIn: number;
  totalOut: number;
  mostOutDateDetail: { date: number; amount: number };
  aggregationByDate: [number, { totalIn: number; totalOut: number }][];
  transactionDetailsByDate: [number, TransactionModel[]][];
  transactions: TransactionModel[];
};
