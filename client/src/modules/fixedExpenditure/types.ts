import { FixedExpenditure } from '@/commons/types/fixedExpenditure';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type FixedExpenditureAction = ActionType<typeof actions>;

export type FixedExpenditureState = {
  loading: boolean;
  error: Error | null;
  data: FixedExpenditure | null;
};
