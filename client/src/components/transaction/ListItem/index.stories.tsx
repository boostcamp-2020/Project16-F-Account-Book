import React from 'react';
import TransactionListItem from '.';

export default {
  title: 'components/transaction/ListItem',
  component: TransactionListItem,
};

const mockTransactions = [
  {
    tid: 80,
    amount: 50000000000000,
    tradeAt: '2020-10-01',
    description:
      'user1의 가계부내역 80입니다. 이 가계부는 영국에서부터 시작되어 다음 사람에게 보내지 않을 시 3대가 대박나고 당신의 미래는 화창할 것입니다.',
    isIncome: true,
    uid: 1,
    cid: 1,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행 체크카드',
      uid: 1,
    },
    category: {
      cid: 1,
      name: '월급',
      isIncome: true,
      uid: 1,
    },
  },
  {
    tid: 82,
    amount: 7000,
    tradeAt: '2020-10-01',
    description: 'user1의 가계부내역 82',
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
      isIncome: false,
      uid: 1,
    },
  },
  {
    tid: 83,
    amount: 3500,
    tradeAt: '2020-10-01',
    description: 'user1의 가계부내역 83',
    isIncome: false,
    uid: 1,
    cid: 3,
    pid: 3,
    payment: {
      pid: 3,
      name: '농협은행',
      uid: 1,
    },
    category: {
      cid: 3,
      name: '교통비',
      isIncome: false,
      uid: 1,
    },
  },
  {
    tid: 84,
    amount: 4000,
    tradeAt: '2020-10-01',
    description: 'user1의 가계부내역 84',
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
      isIncome: false,
      uid: 1,
    },
  },
];

export const ListItemSample = (): JSX.Element => (
  <TransactionListItem transaction={mockTransactions[0]} />
);

export const MultipleListItem = (): JSX.Element => (
  <>
    {mockTransactions.map((mockTransaction) => (
      <TransactionListItem transaction={mockTransaction} />
    ))}
  </>
);
