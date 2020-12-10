/* eslint-disable import/prefer-default-export */
import aggregateCategoryAPI from '@libs/api/aggregateCategory';
import createAsyncThunk from '@libs/createAsyncThunk';
import { getAggregateCategoryAsync } from './actions';

const getAggregateCategoryThunk = createAsyncThunk(
  getAggregateCategoryAsync,
  aggregateCategoryAPI.getAggregateCategory,
);

export { getAggregateCategoryThunk };
