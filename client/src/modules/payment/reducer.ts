import { createReducer } from 'typesafe-actions';
import { GET_PAYMENT, GET_PAYMENT_FAILURE, GET_PAYMENT_SUCCESS } from './actions';
import { PaymentAction, PaymentState } from './types';

const initialState: PaymentState = {
  payments: {
    loading: false,
    error: null,
    data: null,
  },
};

const paymentReducer = createReducer<PaymentState, PaymentAction>(initialState, {
  [GET_PAYMENT]: (state) => ({
    ...state,
    payments: {
      loading: true,
      error: null,
      data: null,
    },
  }),
  [GET_PAYMENT_SUCCESS]: (state, action) => ({
    ...state,
    payments: {
      loading: false,
      error: null,
      data: action.payload,
    },
  }),
  [GET_PAYMENT_FAILURE]: (state, action) => ({
    ...state,
    payments: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

export default paymentReducer;
