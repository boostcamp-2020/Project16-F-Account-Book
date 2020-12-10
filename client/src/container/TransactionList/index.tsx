import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionListItem from '@/components/transaction/ListItem';
import { RootState } from '@modules/index';
import { toggleModalOn } from '@/modules/updateModal';
import { TransactionModel } from '@/commons/types/transaction';
import * as S from './styles';

const TransactionListContainer = (): JSX.Element => {
  const { transaction } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const toggleModal = useCallback(
    (t: TransactionModel) => {
      dispatch(toggleModalOn(t));
    },
    [dispatch],
  );

  return (
    <>
      {transaction.transactionDetailsByDate.map(([date, transactionDetails]) => (
        <S.DateContainer key={`transaction_box_${date}`}>
          <S.DateLabel>{date}일</S.DateLabel>
          {transactionDetails.map((transactionDetail) => (
            <TransactionListItem
              toggleUpdateModal={() => {
                toggleModal(transactionDetail);
              }}
              key={`transaction_${transactionDetail.tid}`}
              transaction={transactionDetail}
              border
            />
          ))}
        </S.DateContainer>
      ))}
    </>
  );
};

export default TransactionListContainer;
