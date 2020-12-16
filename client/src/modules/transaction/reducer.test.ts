import { mockTransactions } from '@/commons/mockData';
import reducer from './reducer';
import * as TransactionActions from './actions';
import aggregateTransactions from './aggregateUtil';

describe('Transaction Reducer Tests', () => {
  it('현재 상태의 date와 동일한 년,월로 가계부가 등록되면 상태가 업데이트 된다.', () => {
    const prevState = {
      loading: false,
      error: null,
      date: { year: 2020, month: 12 },
      ...aggregateTransactions(mockTransactions),
    };
    const prevTransactionsLength = prevState.transactions.length;

    const getPostTransactionsSuccessHandler =
      reducer.handlers[TransactionActions.POST_TRANSACTION_SUCCESS];

    if (!getPostTransactionsSuccessHandler) {
      throw new Error('handler undefiend');
    }

    const afterState = getPostTransactionsSuccessHandler(prevState, {
      type: TransactionActions.POST_TRANSACTION_SUCCESS,
      payload: {
        tid: 100,
        amount: 7000,
        tradeAt: '2020-12-07',
        description: 'user1의 가계부내역 100',
        isIncome: false,
        uid: 1,
        cid: 2,
        pid: 3,
        payment: {
          pid: 3,
          name: '농협은행',
          uid: 1,
        },
        category: {
          cid: 2,
          name: '식비',
          isIncome: true,
          uid: 1,
        },
      },
    });
    expect(afterState.transactions.length).toBeGreaterThan(prevTransactionsLength);
    expect(afterState.totalOut).toBeGreaterThan(prevState.totalOut);
  });

  it('현재 상태의 date와 다른 년,월로 가계부가 등록되면 상태가 업데이트 되지 않는다.', () => {
    const prevState = {
      loading: false,
      error: null,
      date: { year: 2020, month: 12 },
      ...aggregateTransactions(mockTransactions),
    };
    const prevTransactionsLength = prevState.transactions.length;

    const getPostTransactionsSuccessHandler =
      reducer.handlers[TransactionActions.POST_TRANSACTION_SUCCESS];

    if (!getPostTransactionsSuccessHandler) {
      throw new Error('handler undefined');
    }

    const afterState = getPostTransactionsSuccessHandler(prevState, {
      type: TransactionActions.POST_TRANSACTION_SUCCESS,
      payload: {
        tid: 100,
        amount: 7000,
        tradeAt: '2020-11-07',
        description: 'user1의 가계부내역 100',
        isIncome: false,
        uid: 1,
        cid: 2,
        pid: 3,
        payment: {
          pid: 3,
          name: '농협은행',
          uid: 1,
        },
        category: {
          cid: 2,
          name: '식비',
          isIncome: true,
          uid: 1,
        },
      },
    });
    expect(afterState.transactions.length).toEqual(prevTransactionsLength);
    expect(afterState.totalIn).toEqual(prevState.totalIn);
    expect(afterState.totalOut).toEqual(prevState.totalOut);
  });

  it('월 가계부 내역을 불러오는데 성공하면 상태의 년,월과 내역 리스트, 집계 데이터가 업데이트 된다.', () => {
    const prevState = {
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

    const getMonthTransactionsSuccessHandler =
      reducer.handlers[TransactionActions.GET_MONTHLY_TRANSACTION_SUCCESS];

    if (!getMonthTransactionsSuccessHandler) {
      throw new Error('handler undefined');
    }

    const afterState = getMonthTransactionsSuccessHandler(prevState, {
      type: TransactionActions.GET_MONTHLY_TRANSACTION_SUCCESS,
      payload: {
        date: { year: 2020, month: 12 },
        list: mockTransactions,
      },
    });

    expect(afterState.date).toEqual({ year: 2020, month: 12 });
    expect(afterState.totalIn).not.toEqual(0);
    expect(afterState.totalOut).not.toEqual(0);
    expect(afterState.mostOutDateDetail.date).not.toEqual(0);
    expect(afterState.mostOutDateDetail.amount).not.toEqual(0);
    expect(afterState.aggregationByDate.length).toBeGreaterThan(0);
    expect(afterState.transactionDetailsByDate.length).toBeGreaterThan(0);
    expect(afterState.transactions.length).toBeGreaterThan(0);
  });
});
