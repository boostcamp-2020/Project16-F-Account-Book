import { AggregateData } from '@/commons/types/aggregateCategory';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type AggregateCategoryAction = ActionType<typeof actions>;

export type AggregateCategoryState = {
  loading: boolean;
  error: Error | null;
  data: AggregateData;
};
