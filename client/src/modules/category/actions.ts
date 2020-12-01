import { CategoryModel } from '@commons/types/category';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

export const GET_CATEGORY = 'category/GET';
export const GET_CATEGORY_SUCCESS = 'category/GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILURE = 'category/GET_CATEGORY_FAILURE';

export const getCategoryAsync = createAsyncAction(
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
)<string, CategoryModel[], AxiosError>();
