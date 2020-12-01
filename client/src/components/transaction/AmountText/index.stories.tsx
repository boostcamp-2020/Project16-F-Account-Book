import React from 'react';
import AmountText from '.';

export default {
  title: 'components/transaction/AmountText',
  component: AmountText,
};

export const IncomeText = (): JSX.Element => <AmountText isIncome amount={10000} />;

export const ExpenditureText = (): JSX.Element => <AmountText isIncome={false} amount={10000} />;

export const LargeSizeText = (): JSX.Element => <AmountText isIncome size="lg" amount={10000} />;

export const SmallSizeText = (): JSX.Element => <AmountText isIncome size="sm" amount={10000} />;

export const XSSizeText = (): JSX.Element => <AmountText isIncome size="xs" amount={10000} />;
