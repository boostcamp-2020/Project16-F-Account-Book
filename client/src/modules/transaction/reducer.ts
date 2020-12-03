import { TransactionModel } from '@/commons/types/transaction';
import { createReducer, PayloadAction } from 'typesafe-actions';
import DateUtils from '@/libs/dateUtils';
import { POST_TRANSACTION, POST_TRANSACTION_FAILURE, POST_TRANSACTION_SUCCESS } from './actions';
import { TransactionAction, TransactionState } from './types';
import aggregateTransactions from './aggregateUtil';

const initialState: TransactionState = {
  loading: false,
  error: null,
  date: { year: 2020, month: 11 },
  totalIn: 0,
  totalOut: 0,
  mostOutDateInfo: { date: 0, amount: 0 },
  aggregationByDate: [],
  transactionDetailisByDate: [],
  transactions: [],
};

const updateTransactionState = (
  type: 'post' | 'patch' | 'delete',
  state: TransactionState,
  { payload }: PayloadAction<string, TransactionModel>,
): TransactionState => {
  const { year, month } = DateUtils.parseDate(payload.tradeAt);
  if (!(state.date && year === state.date.year && month === state.date.month))
    return {
      ...state,
      loading: false,
      error: null,
    };

  const copiedState = { ...state };
  if (type === 'post') {
    copiedState.transactions.push(payload);
  } else {
    const subIndex = copiedState.transactions.findIndex(
      (transaction) => transaction.tid === payload.tid,
    );

    if (type === 'patch') {
      copiedState.transactions[subIndex] = payload;
    } else {
      copiedState.transactions.splice(subIndex, 1);
    }
  }
  const aggregation = aggregateTransactions(copiedState.transactions);

  return {
    ...state,
    loading: false,
    error: null,
    ...aggregation,
  };
};

const transactionReducer = createReducer<TransactionState, TransactionAction>(initialState, {
  [POST_TRANSACTION]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [POST_TRANSACTION_SUCCESS]: (state, action) => {
    const updatedState = updateTransactionState('post', state, action);
    console.log(updatedState);
    return updatedState;
  },
  [POST_TRANSACTION_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
});

export default transactionReducer;
