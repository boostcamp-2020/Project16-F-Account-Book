import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { AggregateCategoryData } from '@/commons/types/aggregate';

export const GET_AGGREGATE_CATEGORY = 'aggregateCategory/GET_AGGREGATE_CATEGORY';
export const GET_AGGREGATE_CATEGORY_SUCCESS = 'aggregateCategory/GET_AGGREGATE_CATEGORY_SUCCESS';
export const GET_AGGREGATE_CATEGORY_FAILURE = 'aggregateCategory/GET_AGGREGATE_CATEGORY_FAILURE';

export const getAggregateCategoryAsync = createAsyncAction(
  GET_AGGREGATE_CATEGORY,
  GET_AGGREGATE_CATEGORY_SUCCESS,
  GET_AGGREGATE_CATEGORY_FAILURE,
)<string, AggregateCategoryData, AxiosError>();
