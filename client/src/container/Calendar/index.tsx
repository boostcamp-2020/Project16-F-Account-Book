import React from 'react';
import SelectMonth from '@/components/common/SelectMonth';
import TransactionListItem from '@/components/transaction/ListItem';
import AmountText from '@/components/transaction/AmountText';
import ViewCalendar from '@components/calendar/CalendarView';
import * as S from './styles';
import { CalendarType } from './types';

const mockTransactions = [
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-01',
    description: 'user1의 가계부내역 82',
    isIncome: true,
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
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-10-05',
    description: 'user1의 가계부내역 82',
    isIncome: true,
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
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-03',
    description: 'user1의 가계부내역 82',
    isIncome: true,
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
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-18',
    description: 'user1의 가계부내역 82',
    isIncome: true,
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
  {
    tid: 82,
    amount: 5000,
    tradeAt: '2020-12-20',
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
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-21',
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
    tid: 82,
    amount: 5000,
    tradeAt: '2020-10-22',
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
    tid: 82,
    amount: 10000,
    tradeAt: '2020-10-23',
    description: 'user1의 가계부내역 82',
    isIncome: true,
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
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-27',
    description: 'user1의 가계부내역 82',
    isIncome: true,
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
  {
    tid: 82,
    amount: 10000,
    tradeAt: '2020-12-30',
    description: 'user1의 가계부내역 82',
    isIncome: true,
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
];

const totalInOut: any = {
  1: { totalIn: 150, totalOut: 5000 },
  5: { totalIn: 10000, totalOut: 0 },
  13: { totalIn: 10000, totalOut: 0 },
  18: { totalIn: 50000, totalOut: 40000 },
  20: { totalIn: 20000, totalOut: 25000 },
  21: { totalIn: 0, totalOut: 5000 },
  22: { totalIn: 10000, totalOut: 0 },
  23: { totalIn: 0, totalOut: 5000 },
  27: { totalIn: 10000, totalOut: 0 },
  30: { totalIn: 0, totalOut: 10000 },
};

const TempCalendar = ({ month, year }: CalendarType): JSX.Element => {
  return (
    <S.WarpCalendarDiv>
      <S.CalendarPageDiv>
        <S.HeaderDiv>
          <SelectMonth month={month} />
          <S.AmountDiv>
            <S.InOutDiv>
              <div>소비: </div> <div>수입: </div>
            </S.InOutDiv>
            <S.AmountAlign>
              <div>
                <AmountText isIncome={false} amount={20000} />
              </div>
              <div>
                <AmountText isIncome amount={70000} />
              </div>
            </S.AmountAlign>
          </S.AmountDiv>
        </S.HeaderDiv>
        <S.CalendarDiv>
          <ViewCalendar totalInOut={totalInOut} lang="ko" year={year} month={month} />
        </S.CalendarDiv>
        <S.TransactionDiv>
          {mockTransactions.map((mockTransaction) => (
            <TransactionListItem transaction={mockTransaction} />
          ))}
        </S.TransactionDiv>
      </S.CalendarPageDiv>
    </S.WarpCalendarDiv>
  );
};
export default TempCalendar;
