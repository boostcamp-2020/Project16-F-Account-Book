import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TransactionListItem from '@/components/transaction/ListItem';
import { RootState } from '@modules/index';
import { toggleModalOn } from '@/modules/updateModal';
import { TransactionModel } from '@/commons/types/transaction';
import EmptyStateComponent from '@/components/transaction/EmptyState';
import * as S from './styles';
import { TransactionListContainerProps } from './types';

const TransactionListContainer = ({ editable }: TransactionListContainerProps): JSX.Element => {
  const { transaction } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const toggleModal = useCallback((t: TransactionModel) => {
    dispatch(toggleModalOn(t));
  }, []);
  const length = useRef(1);
  const target = useRef<HTMLDivElement>(null);
  const [renderedTransaction, setRenderedTransaction] = useState(
    [] as [number, TransactionModel[]][],
  );

  const maxLength = transaction.aggregationByDate.length / 5;
  const changeExtraTransaction = () => {
    const newrenderedTransaction = renderedTransaction.concat(
      transaction.transactionDetailsByDate.slice(5 * length.current, 5 * length.current + 5),
    );
    length.current += 1;
    setRenderedTransaction(newrenderedTransaction);
  };

  useEffect(() => {
    if (!transaction.loading) {
      length.current = 1;
      if (transaction.transactionDetailsByDate.length < 5) {
        setRenderedTransaction(transaction.transactionDetailsByDate);
      } else {
        setRenderedTransaction(transaction.transactionDetailsByDate.slice(0, 5));
      }
    }
  }, [transaction]);

  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && length.current < maxLength) {
        observer.unobserve(entry.target);
        changeExtraTransaction();
      }
    });
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (!transaction.loading) {
      if (target.current) {
        observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
        observer.observe(target.current as Element);
      }
    }
    return () => observer && observer.disconnect();
  }, [transaction, renderedTransaction]);

  return (
    <>
      {transaction.transactionDetailsByDate.length !== 0 ? (
        renderedTransaction.map(([date, transactionDetails]) => (
          <S.DateContainer key={`transaction_box_${date}`} ref={target}>
            <S.DateLabel>{date}일</S.DateLabel>
            {transactionDetails.map((transactionDetail) => (
              <S.TransactionListItemWrapper key={`transaction_Wrap${transactionDetail.tid}`}>
                <TransactionListItem
                  toggleUpdateModal={() => {
                    toggleModal(transactionDetail);
                  }}
                  key={`transaction_${transactionDetail.tid}`}
                  transaction={transactionDetail}
                  editable={editable}
                />
              </S.TransactionListItemWrapper>
            ))}
          </S.DateContainer>
        ))
      ) : (
        <EmptyStateComponent />
      )}
    </>
  );
};

export default TransactionListContainer;
