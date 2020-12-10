import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/modules/index';
import TransactionListItem from '@/components/transaction/ListItem';
import { TransactionListItemWrapper } from '@/container/TransactionList/styles';
import * as S from './styles';

const TransactionSelectList = (): JSX.Element => {
  const { transaction, calendarDaySelector } = useSelector((state: RootState) => state);
  const transactionData = new Map(transaction.transactionDetailsByDate);
  const transactionList = transactionData
    .get(Number(calendarDaySelector.day))
    ?.map((transactionDay) => (
      <TransactionListItemWrapper>
        <TransactionListItem
          key={`transaction_${transactionDay.tid}`}
          transaction={transactionDay}
        />
      </TransactionListItemWrapper>
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
