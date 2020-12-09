import { createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import { FixedExpenditure } from '@/commons/types/fixedExpenditure';

export const GET_FIXED_EXPENDITURE = 'fixedExpenditure/GET_FIXED_EXPENDITURE';
export const GET_FIXED_EXPENDITURE_SUCCESS = 'fixedExpenditure/GET_FIXED_EXPENDITURE_SUCCESS';
export const GET_FIXED_EXPENDITURE_FAILURE = 'fixedExpenditure/GET_FIXED_EXPENDITURE_FAILURE';

export const getFixedExpenditureAsync = createAsyncAction(
  GET_FIXED_EXPENDITURE,
  GET_FIXED_EXPENDITURE_SUCCESS,
  GET_FIXED_EXPENDITURE_FAILURE,
)<string, FixedExpenditure, AxiosError>();
