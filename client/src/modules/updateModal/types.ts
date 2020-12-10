import { TransactionModel } from '@/commons/types/transaction';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type UpdateModalAction = ActionType<typeof actions>;

export type UpdateModalState = {
  toggle: boolean;
  data: TransactionModel | null;
};
