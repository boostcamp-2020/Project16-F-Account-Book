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
        <S.DateContainer key={`transaction_box_${date}`}>
          <S.DateLabel>{date}일</S.DateLabel>
          {transactionDetails.map((transactionDetail) => (
            <S.TransactionListItemWrapper>
              <TransactionListItem
                key={`transaction_${transactionDetail.tid}`}
                transaction={transactionDetail}
              />
            </S.TransactionListItemWrapper>
          ))}
        </S.DateContainer>
      ))}
    </>
  );
};

export default TransactionListContainer;
