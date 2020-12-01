import React from 'react';
import ArrowIcon from '.';

export default {
  title: 'components/ArrowIcon',
  component: ArrowIcon,
};

export const ArrowDownButton = (): JSX.Element => (
  <ArrowIcon height="10px" width="20px" rotate="90" />
);

export const ArrowUpButton = (): JSX.Element => (
  <ArrowIcon height="10px" width="20px" rotate="180" />
);
