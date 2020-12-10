import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/modules/index';
import TransactionListItem from '@/components/transaction/ListItem';
import * as S from './styles';

const TransactionSelectList = (): JSX.Element => {
  const { transaction, calendarDaySelector } = useSelector((state: RootState) => state);
  const transactionData = new Map(transaction.transactionDetailsByDate);
  const transactionList = transactionData
    .get(Number(calendarDaySelector.day))
    ?.map((transactionDay) => (
      <TransactionListItem
        key={`transaction_${transactionDay.tid}`}
        transaction={transactionDay}
        border
      />
    ));
  return (
    <>
      <S.DateContainer>
        <S.DateLabel>{calendarDaySelector.day}일</S.DateLabel>
        {transactionList}
      </S.DateContainer>
    </>
  );
};

export default TransactionSelectList;
