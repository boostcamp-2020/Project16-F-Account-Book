import { TransactionModel } from '@/commons/types/transaction';
import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

export type TransactionAction = ActionType<typeof actions>;

export type TransactionState = {
  transactions: {
    loading: boolean;
    error: Error | null;
    data: TransactionModel[] | null;
  };
};
