import LineGraph from '@/components/transaction/LineGraph';
import { RootState } from '@/modules';
import React from 'react';
import { useSelector } from 'react-redux';
import EmptyStateComponent from '@/components/transaction/EmptyState';
import SelectMonth from '../SelectMonth';
import * as S from './styles';

const LineGraphContainer = (): JSX.Element => {
  const { transaction } = useSelector((state: RootState) => state);
  return (
    <>
      {transaction && (
        <>
          <SelectMonth />
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
