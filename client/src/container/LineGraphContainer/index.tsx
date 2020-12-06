import LineGraph from '@/components/transaction/LineGraph';
import { RootState } from '@/modules';
import React from 'react';
import { useSelector } from 'react-redux';
import StyledLineGraphContainer from './style';

const LineGraphContainer = () => {
  const { transaction } = useSelector((state: RootState) => state);
  return (
    <>
      {transaction && (
        <StyledLineGraphContainer>
          <LineGraph width={500} height={300} data={transaction.aggregationByDate} />
        </StyledLineGraphContainer>
      )}
    </>
  );
};

export default LineGraphContainer;
