import LineGraph from '@/components/transaction/LineGraph';
import { RootState } from '@/modules';
import React from 'react';
import { useSelector } from 'react-redux';
import SelectMonth from '../SelectMonth';
import * as S from './styles';

const LineGraphContainer = () => {
  const { transaction } = useSelector((state: RootState) => state);
  return (
    <>
      {transaction && (
        <>
          <SelectMonth />
          <S.StyledLineGraphContainer>
            <S.LineGraphText>기간별 통계</S.LineGraphText>
            <LineGraph data={transaction.aggregationByDate} />
          </S.StyledLineGraphContainer>
        </>
      )}
    </>
  );
};

export default LineGraphContainer;
