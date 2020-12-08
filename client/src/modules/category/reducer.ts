import { createReducer } from 'typesafe-actions';
import { GET_CATEGORY, GET_CATEGORY_FAILURE, GET_CATEGORY_SUCCESS } from './actions';
import { CategoryAction, CategoryState } from './types';

const initialState: CategoryState = {
  loading: false,
  error: null,
  data: [],
};

const categoryReducer = createReducer<CategoryState, CategoryAction>(initialState, {
  [GET_CATEGORY]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    error: null,
    data: action.payload,
  }),
  [GET_CATEGORY_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
});

export default categoryReducer;
