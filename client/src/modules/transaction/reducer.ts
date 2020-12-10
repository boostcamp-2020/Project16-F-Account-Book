import { TransactionModel } from '@/commons/types/transaction';
import { createReducer, PayloadAction } from 'typesafe-actions';
import DateUtils from '@/libs/dateUtils';
import * as transactionActions from './actions';
import { TransactionAction, TransactionState } from './types';
import aggregateTransactions from './aggregateUtil';

const initialState: TransactionState = {
  loading: false,
  error: null,
  date: null,
  totalIn: 0,
  totalOut: 0,
  mostOutDateDetail: { date: 0, amount: 0 },
  aggregationByDate: [],
  transactionDetailsByDate: [],
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
  copiedState.transactions.sort(
    (t1, t2) => new Date(t2.tradeAt).getTime() - new Date(t1.tradeAt).getTime(),
  );
  const aggregation = aggregateTransactions(copiedState.transactions);

  return {
    ...state,
    loading: false,
    error: null,
    ...aggregation,
  };
};

const transactionReducer = createReducer<TransactionState, TransactionAction>(initialState, {
  [transactionActions.POST_TRANSACTION]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [transactionActions.POST_TRANSACTION_SUCCESS]: (state, action) => {
    const updatedState = updateTransactionState('post', state, action);
    return updatedState;
  },
  [transactionActions.POST_TRANSACTION_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [transactionActions.GET_MONTHLY_TRANSACTION]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [transactionActions.GET_MONTHLY_TRANSACTION_SUCCESS]: (state, { payload }) => {
    const { date, list } = payload;
    const aggregation = aggregateTransactions(list);
    return {
      ...state,
      loading: false,
      error: null,
      date,
      ...aggregation,
    };
  },
  [transactionActions.GET_MONTHLY_TRANSACTION_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [transactionActions.UPDATE_TRANSACTION]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [transactionActions.UPDATE_TRANSACTION_SUCCESS]: (state, action) => {
    const updatedState = updateTransactionState('patch', state, action);
    return updatedState;
  },
  [transactionActions.UPDATE_TRANSACTION_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
  [transactionActions.DELETE_TRANSACTION]: (state) => ({
    ...state,
    loading: true,
    error: null,
  }),
  [transactionActions.DELETE_TRANSACTION_SUCCESS]: (state, action) => {
    const updatedState = updateTransactionState('delete', state, action);
    return updatedState;
  },
  [transactionActions.DELETE_TRANSACTION_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload,
  }),
});

export default transactionReducer;
