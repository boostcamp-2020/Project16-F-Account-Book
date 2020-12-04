import React from 'react';
import { useSelector } from 'react-redux';
import TransactionListItem from '@/components/transaction/ListItem';
import { RootState } from '@modules/index';
import * as S from './styles';

const TransactionListContainer = (): JSX.Element => {
  const { transaction } = useSelector((state: RootState) => state);

  return (
    <>
      {transaction.transactionDetailsByDate.map(([date, transactionDetails]) => (
        <S.DateContainer>
          <S.DateLabel>{date}일</S.DateLabel>
          {transactionDetails.map((transactionDetail) => (
            <TransactionListItem transaction={transactionDetail} border />
          ))}
        </S.DateContainer>
      ))}
    </>
  );
};

export default TransactionListContainer;
