import React from 'react';
import SelectMonth from '.';

export default {
  title: 'components/common/SelectMonth',
  component: SelectMonth,
};

export const SelectMonthButton1 = (): JSX.Element => <SelectMonth month={12} />;

export const SelectMonthButton2 = (): JSX.Element => <SelectMonth month={5} />;
