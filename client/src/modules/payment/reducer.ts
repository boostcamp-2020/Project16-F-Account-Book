import { PaymentModel } from '@/commons/types/payment';
import { createReducer } from 'typesafe-actions';
import {
  DELETE_PAYMENT,
  DELETE_PAYMENT_SUCCESS,
  GET_PAYMENT,
  GET_PAYMENT_FAILURE,
  GET_PAYMENT_SUCCESS,
  POST_PAYMENT,
  POST_PAYMENT_FAILURE,
  POST_PAYMENT_SUCCESS,
  UPDATE_PAYMENT,
  UPDATE_PAYMENT_FAILURE,
  UPDATE_PAYMENT_SUCCESS,
} from './actions';
import { PaymentAction, PaymentState } from './types';

const initialState: PaymentState = {
  loading: false,
  error: null,
  data: [],
};

const paymentReducer = createReducer<PaymentState, PaymentAction>(initialState, {
  [GET_PAYMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [GET_PAYMENT_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
    data: payload,
  }),
  [GET_PAYMENT_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [POST_PAYMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [POST_PAYMENT_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
    data: state.data.concat(payload),
  }),
  [POST_PAYMENT_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [UPDATE_PAYMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [UPDATE_PAYMENT_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: state.data.map((payment) => {
      if (payment.pid === payload.pid) return payload;
      return state.data;
    }) as PaymentModel[],
  }),
  [UPDATE_PAYMENT_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [DELETE_PAYMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [DELETE_PAYMENT_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: state.data.filter((payment) => payment.pid !== payload.pid),
  }),
});

export default paymentReducer;
