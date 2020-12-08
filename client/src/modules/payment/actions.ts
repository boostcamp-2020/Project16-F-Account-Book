import { PaymentModel } from '@commons/types/payment';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

export const GET_PAYMENT = 'payment/GET';
export const GET_PAYMENT_SUCCESS = 'payment/GET_PAYMENT_SUCCESS';
export const GET_PAYMENT_FAILURE = 'payment/GET_PAYMENT_FAILURE';

export const DELETE_PAYMENT = 'payment/DELETE';
export const DELETE_PAYMENT_SUCCESS = 'payment/DELETE_PAYMENT_SUCCESS';
export const DELETE_PAYMENT_FAILURE = 'payment/DELETE_PAYMENT_FAILURE';

export const UPDATE_PAYMENT = 'payment/UPDATE';
export const UPDATE_PAYMENT_SUCCESS = 'payment/UPDATE_PAYMENT_SUCCESS';
export const UPDATE_PAYMENT_FAILURE = 'payment/UPDATE_PAYMENT_FAILURE';

export const getPaymentAsync = createAsyncAction(
  GET_PAYMENT,
  GET_PAYMENT_SUCCESS,
  GET_PAYMENT_FAILURE,
)<string, PaymentModel[], AxiosError>();

export const deletePaymentAsync = createAsyncAction(
  DELETE_PAYMENT,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAILURE,
)<string, PaymentModel[], AxiosError>();

export const updatePaymentAsync = createAsyncAction(
  UPDATE_PAYMENT,
  UPDATE_PAYMENT_SUCCESS,
  UPDATE_PAYMENT_FAILURE,
)<string, PaymentModel[], AxiosError>();
