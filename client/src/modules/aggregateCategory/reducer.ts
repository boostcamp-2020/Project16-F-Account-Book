import { createReducer } from 'typesafe-actions';
import {
  GET_AGGREGATE_CATEGORY,
  GET_AGGREGATE_CATEGORY_SUCCESS,
  GET_AGGREGATE_CATEGORY_FAILURE,
} from './actions';
import { AggregateCategoryAction, AggregateCategoryState } from './types';

const initialState: AggregateCategoryState = {
  loading: false,
  error: null,
  data: {
    income: [],
    expenditure: [],
  },
};

const aggregateCategoryReducer = createReducer<AggregateCategoryState, AggregateCategoryAction>(
  initialState,
  {
    [GET_AGGREGATE_CATEGORY]: (state) => ({
      ...state,
      loading: true,
      error: null,
      data: {
        income: [],
        expenditure: [],
      },
    }),
    [GET_AGGREGATE_CATEGORY_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      data: action.payload,
    }),
    [GET_AGGREGATE_CATEGORY_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      data: {
        income: [],
        expenditure: [],
      },
    }),
  },
);

export default aggregateCategoryReducer;
