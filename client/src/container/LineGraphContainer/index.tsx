import LoadingSpinner from '@/components/common/LoadingSpinner';
import LineGraph from '@/components/transaction/LineGraph';
import { RootState } from '@/modules';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyStateComponent from '@/components/transaction/EmptyState';
import { getMonthlyTransactionThunk } from '@/modules/transaction';
import SelectMonth from '../SelectMonth';
import * as S from './styles';

const LineGraphContainer = (): JSX.Element => {
  const { transaction, datePicker } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const getMonthlyTransactions = useCallback(() => {
    dispatch(getMonthlyTransactionThunk(datePicker));
  }, [datePicker]);

  useEffect(() => {
    getMonthlyTransactions();
  }, [datePicker]);

  return (
    <>
      <SelectMonth />
      {transaction.loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {transaction.aggregationByDate.length === 0 ? (
            <EmptyStateComponent />
          ) : (
            <S.StyledLineGraphContainer>
              <S.LineGraphText>기간별 통계</S.LineGraphText>
              <LineGraph data={transaction.aggregationByDate} />
            </S.StyledLineGraphContainer>
          )}
        </>
      )}
    </>
  );
};

export default LineGraphContainer;
