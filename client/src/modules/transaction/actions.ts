import { TransactionModel, MonthTransactionsResponse } from '@/commons/types/transaction';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

export const POST_TRANSACTION = 'transactin/POST';
export const POST_TRANSACTION_SUCCESS = 'transaction/POST_TRANSACTION_SUCCESS';
export const POST_TRANSACTION_FAILURE = 'transaction/POST_TRANSACTION_FAILURE';

export const postTransactionAsync = createAsyncAction(
  POST_TRANSACTION,
  POST_TRANSACTION_SUCCESS,
  POST_TRANSACTION_FAILURE,
)<string, TransactionModel, AxiosError>();

export const GET_MONTHLY_TRANSACTION = 'transaction/GET_MONTHLY_TRANSACTION';
export const GET_MONTHLY_TRANSACTION_SUCCESS = 'transaction/GET_MONTHLY_TRANSACTION_SUCCESS';
export const GET_MONTHLY_TRANSACTION_FAILURE = 'transaction/GET_MONTHLY_TRANSACTION_FAILURE';

export const getMonthlyTransactionAsync = createAsyncAction(
  GET_MONTHLY_TRANSACTION,
  GET_MONTHLY_TRANSACTION_SUCCESS,
  GET_MONTHLY_TRANSACTION_FAILURE,
)<string, MonthTransactionsResponse, AxiosError>();

export const UPDATE_TRANSACTION = 'transaction/UPDATE_TRANSACTION';
export const UPDATE_TRANSACTION_SUCCESS = 'transaction/UPDATE_TRANSACTION_SUCCESS';
export const UPDATE_TRANSACTION_FAILURE = 'transaction/UPDATE_TRANSACTION_FAILURE';

export const updateTransactionAsync = createAsyncAction(
  UPDATE_TRANSACTION,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAILURE,
)<string, TransactionModel, AxiosError>();

export const DELETE_TRANSACTION = 'transaction/DELETE_TRANSACTION';
export const DELETE_TRANSACTION_SUCCESS = 'transaction/DELETE_TRANSACTION_SUCCESS';
export const DELETE_TRANSACTION_FAILURE = 'transaction/DELETE_TRANSACTION_FAILURE';

export const deleteTransactionAsync = createAsyncAction(
  DELETE_TRANSACTION,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
)<string, TransactionModel, AxiosError>();
