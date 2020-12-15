/* eslint-disable import/prefer-default-export */
import aggregateAPI from '@libs/api/aggregate';
import createAsyncThunk from '@libs/createAsyncThunk';
import { getAggregateCategoryAsync } from './actions';

const getAggregateCategoryThunk = createAsyncThunk(
  getAggregateCategoryAsync,
  aggregateAPI.getAggregateCategory,
);

export { getAggregateCategoryThunk };
