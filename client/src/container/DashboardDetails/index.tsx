import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@modules/index';
import TransactionListItem from '@/components/transaction/ListItem';
import AmountText from '@/components/transaction/AmountText';
import FixedExpenditure from '@container/FixedExpenditure';
import * as S from './styles';

const RECENT_TRANSACTION_LIMIT = 3;

const DashboardDetailsContainer = (): JSX.Element => {
  const { transaction, datePicker } = useSelector((state: RootState) => state);

  return (
    <>
      <S.TotalInOutBox>
        <S.BoxTitle>{datePicker.month + 1}월 소비/수입</S.BoxTitle>
        <S.TotalInOutBoxItem>
          <AmountText isIncome={false} size="lg" amount={transaction.totalOut} />
        </S.TotalInOutBoxItem>
        <S.TotalInOutBoxItem>
          <AmountText isIncome size="lg" amount={transaction.totalIn} />
        </S.TotalInOutBoxItem>
      </S.TotalInOutBox>
      <S.RecentTransactionBox>
        <S.RecentTransactionBoxHeader>
          <S.BoxTitle>최근 내역</S.BoxTitle>
          <Link to="/calendar">자세히 보기</Link>
        </S.RecentTransactionBoxHeader>
        {transaction.transactions.slice(0, RECENT_TRANSACTION_LIMIT).map((mockTransaction) => (
          <S.RecentTransactionBoxItem>
            <TransactionListItem transaction={mockTransaction} />
          </S.RecentTransactionBoxItem>
        ))}
      </S.RecentTransactionBox>
      <FixedExpenditure />
    </>
  );
};

export default DashboardDetailsContainer;
