import { createReducer } from 'typesafe-actions';
import { POST_TRANSACTION, POST_TRANSACTION_FAILURE, POST_TRANSACTION_SUCCESS } from './actions';
import { TransactionAction, TransactionState } from './types';

const initialState: TransactionState = {
  transactions: {
    loading: false,
    error: null,
    data: [],
  },
};

const transactionReducer = createReducer<TransactionState, TransactionAction>(initialState, {
  [POST_TRANSACTION]: (state) => ({
    ...state,
    payments: {
      loading: true,
      error: null,
      data: null,
    },
  }),
  [POST_TRANSACTION_SUCCESS]: (state, action) => ({
    ...state,
    payments: {
      loading: false,
      error: null,
      data: state.transactions.data?.concat(action.payload),
    },
  }),
  [POST_TRANSACTION_FAILURE]: (state, action) => ({
    ...state,
    payments: {
      loading: false,
      error: action.payload,
      data: null,
    },
  }),
});

export default transactionReducer;
