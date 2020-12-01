import { PaymentModel } from '@commons/types/payment';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

export const GET_PAYMENT = 'payment/GET';
export const GET_PAYMENT_SUCCESS = 'payment/GET_PAYMENT_SUCCESS';
export const GET_PAYMENT_FAILURE = 'pyament/GET_PAYMENT_FAILURE';

export const getPaymentAsync = createAsyncAction(
  GET_PAYMENT,
  GET_PAYMENT_SUCCESS,
  GET_PAYMENT_FAILURE,
)<undefined, PaymentModel[], AxiosError>();
