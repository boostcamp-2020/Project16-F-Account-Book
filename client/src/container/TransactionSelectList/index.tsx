import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/modules/index';
import { toggleModalOn } from '@/modules/updateModal';
import TransactionListItem from '@/components/transaction/ListItem';
import { TransactionListItemWrapper } from '@/container/TransactionList/styles';
import { TransactionModel } from '@/commons/types/transaction';
import EmptyStateComponent from '@/components/transaction/EmptyState';
import * as S from './styles';

const TransactionSelectList = (): JSX.Element => {
  const { transaction, calendarDaySelector } = useSelector((state: RootState) => state);
  const transactionData = new Map(transaction.transactionDetailsByDate);
  const transactionList = transactionData.get(
    Number(calendarDaySelector.day),
  ) as TransactionModel[];
  const dispatch = useDispatch();

  const toggleModal = useCallback((t: TransactionModel) => {
    dispatch(toggleModalOn(t));
  }, []);
  return (
    <>
      <S.DateContainer>
        <S.DateLabel>{calendarDaySelector.day}일</S.DateLabel>
        {transactionList ? (
          transactionList.map((transactionDay) => (
            <TransactionListItemWrapper>
              <TransactionListItem
                toggleUpdateModal={() => {
                  toggleModal(transactionDay);
                }}
                key={`transaction_${transactionDay.tid}`}
                transaction={transactionDay}
                editable
              />
            </TransactionListItemWrapper>
          ))
        ) : (
          <EmptyStateComponent />
        )}
      </S.DateContainer>
    </>
  );
};

export default TransactionSelectList;
