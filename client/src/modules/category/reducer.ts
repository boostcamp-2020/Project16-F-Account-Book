import { createReducer } from 'typesafe-actions';
import { GET_CATEGORY, GET_CATEGORY_FAILURE, GET_CATEGORY_SUCCESS } from './actions';
import { CategoryAction, CategoryState } from './types';

const initialState: CategoryState = {
  categories: {
    loading: false,
    error: null,
    data: null,
  },
};

const categoryReducer = createReducer<CategoryState, CategoryAction>(initialState, {
  [GET_CATEGORY]: (state) => ({
    ...state,
    categories: {
      loading: true,
      error: null,
      data: null,
    },
  }),
  [GET_CATEGORY_SUCCESS]: (state, action) => ({
    ...state,
    categories: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_CATEGORY_FAILURE]: (state, action) => ({
    ...state,
    categories: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

export default categoryReducer;
