import React from 'react';
import NumberUtils from '@libs/numberUtils';
import StyledAmountText from './styles';
import { AmountTextProps } from './types';

const TEXT_SIZE: { [key: string]: string } = {
  lg: '1.5rem',
  sm: '0.9rem',
  md: '1rem',
  xs: '0.5rem',
};

const AmountText = ({ isIncome, size = 'md', amount }: AmountTextProps): JSX.Element => {
  const amountTextSize = (textSize: string): string => {
    if (TEXT_SIZE[textSize]) {
      return TEXT_SIZE[textSize];
    }
    return textSize;
  };
  return (
    <StyledAmountText isIncome={isIncome} size={amountTextSize(size)}>
      {isIncome
        ? `+${NumberUtils.numberWithCommas(amount)}`
        : `-${NumberUtils.numberWithCommas(amount)}`}
    </StyledAmountText>
  );
};

export default AmountText;
