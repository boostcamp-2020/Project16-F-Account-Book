import React from 'react';
import AmountText from '.';

export default {
  title: 'components/transaction/AmountText',
  component: AmountText,
};

export const IncomeText = (): JSX.Element => <AmountText isIncome amount={10000} />;

export const ExpenditureText = (): JSX.Element => <AmountText isIncome={false} amount={10000} />;
