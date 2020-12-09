import { CategoryModel } from '@/commons/types/category';
import { createReducer } from 'typesafe-actions';
import * as categoryActions from './actions';
import { CategoryAction, CategoryState } from './types';

const initialState: CategoryState = {
  loading: false,
  error: null,
  data: [],
};

const categoryReducer = createReducer<CategoryState, CategoryAction>(initialState, {
  [categoryActions.GET_CATEGORY]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [categoryActions.GET_CATEGORY_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
    data: payload,
  }),
  [categoryActions.GET_CATEGORY_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [categoryActions.POST_CATEGORY]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [categoryActions.POST_CATEGORY_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
    data: state.data.concat(payload),
  }),
  [categoryActions.POST_CATEGORY_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [categoryActions.UPDATE_CATEGORY]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [categoryActions.UPDATE_CATEGORY_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: state.data.map((category) => {
      if (category.cid === payload.cid) return payload;
      return state.data;
    }) as CategoryModel[],
  }),
  [categoryActions.UPDATE_CATEGORY_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [categoryActions.DELETE_CATEGORY]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [categoryActions.DELETE_CATEGORY_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: state.data.filter((category) => category.cid !== payload.cid),
  }),
  [categoryActions.DELETE_CATEGORY_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
});

export default categoryReducer;
