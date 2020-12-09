import { CategoryModel } from '@commons/types/category';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

export const GET_CATEGORY = 'category/GET';
export const GET_CATEGORY_SUCCESS = 'category/GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_FAILURE = 'category/GET_CATEGORY_FAILURE';

export const POST_CATEGORY = 'category/POST';
export const POST_CATEGORY_SUCCESS = 'category/POST_CATEGORY_SUCCESS';
export const POST_CATEGORY_FAILURE = 'category/POST_CATEGORY_FAILURE';

export const UPDATE_CATEGORY = 'category/UPDATE';
export const UPDATE_CATEGORY_SUCCESS = 'category/UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAILURE = 'category/UPDATE_CATEGORY_FAILURE';

export const DELETE_CATEGORY = 'category/DELETE';
export const DELETE_CATEGORY_SUCCESS = 'category/DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILURE = 'category/DELETE_CATEGORY_FAILURE';

export const getCategoryAsync = createAsyncAction(
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,
)<string, CategoryModel[], AxiosError>();

export const postCategoryAsync = createAsyncAction(
  POST_CATEGORY,
  POST_CATEGORY_SUCCESS,
  POST_CATEGORY_FAILURE,
)<string, CategoryModel, AxiosError>();

export const updateCategoryAsync = createAsyncAction(
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
)<string, CategoryModel, AxiosError>();

export const deleteCategoryAsync = createAsyncAction(
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
)<string, CategoryModel, AxiosError>();
