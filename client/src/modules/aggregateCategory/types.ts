import { AggregateCategoryData } from '@/commons/types/aggregate';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type AggregateCategoryAction = ActionType<typeof actions>;

export type AggregateCategoryState = {
  loading: boolean;
  error: Error | null;
  data: AggregateCategoryData;
};
