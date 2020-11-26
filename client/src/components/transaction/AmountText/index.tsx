import React from 'react';
import NumberUtils from '@libs/numberUtils';
import StyledAmountText from './styles';
import { AmountTextProps } from './types';

function AmountText({ isIncome, amount }: AmountTextProps): JSX.Element {
  return (
    <StyledAmountText isIncome={isIncome}>
      {isIncome
        ? `+ ${NumberUtils.numberWithCommas(amount)}`
        : `- ${NumberUtils.numberWithCommas(amount)}`}
    </StyledAmountText>
  );
}

export default AmountText;
