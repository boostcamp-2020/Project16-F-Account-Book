import { createReducer } from 'typesafe-actions';
import {
  GET_FIXED_EXPENDITURE,
  GET_FIXED_EXPENDITURE_SUCCESS,
  GET_FIXED_EXPENDITURE_FAILURE,
} from './actions';
import { FixedExpenditureAction, FixedExpenditureState } from './types';

const initialState: FixedExpenditureState = {
  loading: false,
  error: null,
  data: null,
};

const fixedExpenditureReducer = createReducer<FixedExpenditureState, FixedExpenditureAction>(
  initialState,
  {
    [GET_FIXED_EXPENDITURE]: (state) => ({
      ...state,
      loading: true,
      error: null,
      data: null,
    }),
    [GET_FIXED_EXPENDITURE_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      error: null,
      data: action.payload,
    }),
    [GET_FIXED_EXPENDITURE_FAILURE]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      data: null,
    }),
  },
);

export default fixedExpenditureReducer;
