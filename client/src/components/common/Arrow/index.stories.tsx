import React from 'react';
import Arrow from '.';

export default {
  title: 'components/Arrow',
  component: Arrow,
};

export const ArrowDownButton = (): JSX.Element => <Arrow height="10px" width="20px" rotate="90" />;

export const ArrowUpButton = (): JSX.Element => <Arrow height="10px" width="20px" rotate="180" />;
