import LineGraph from '@/components/transaction/LineGraph';
import { RootState } from '@/modules';
import React from 'react';
import { useSelector } from 'react-redux';
import StyledLineGraphContainer from './style';
import { LineGraphContainerProps } from './types';

const LineGraphContainer = ({ width, height }: LineGraphContainerProps) => {
  const { transaction } = useSelector((state: RootState) => state);
  return (
    <>
      {transaction && (
        <StyledLineGraphContainer>
          <LineGraph width={width} height={height} data={transaction.aggregationByDate} />
        </StyledLineGraphContainer>
      )}
    </>
  );
};

export default LineGraphContainer;
