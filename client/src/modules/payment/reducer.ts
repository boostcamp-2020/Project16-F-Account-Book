import { PaymentModel } from '@/commons/types/payment';
import { createReducer } from 'typesafe-actions';
import * as paymentActions from './actions';
import { PaymentAction, PaymentState } from './types';

const initialState: PaymentState = {
  loading: false,
  error: null,
  data: [],
};

const paymentReducer = createReducer<PaymentState, PaymentAction>(initialState, {
  [paymentActions.GET_PAYMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [paymentActions.GET_PAYMENT_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
    data: payload,
  }),
  [paymentActions.GET_PAYMENT_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [paymentActions.POST_PAYMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [paymentActions.POST_PAYMENT_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
    data: state.data.concat(payload),
  }),
  [paymentActions.POST_PAYMENT_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [paymentActions.UPDATE_PAYMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [paymentActions.UPDATE_PAYMENT_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: state.data.map((payment) => {
      if (payment.pid === payload.pid) return payload;
      return state.data;
    }) as PaymentModel[],
  }),
  [paymentActions.UPDATE_PAYMENT_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
  [paymentActions.DELETE_PAYMENT]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [paymentActions.DELETE_PAYMENT_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    data: state.data.filter((payment) => payment.pid !== payload.pid),
  }),
  [paymentActions.DELETE_PAYMENT_FAILURE]: (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  }),
});

export default paymentReducer;
