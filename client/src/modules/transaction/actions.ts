import { TransactionModel } from '@/commons/types/transaction';
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
