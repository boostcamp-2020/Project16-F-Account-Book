import React from 'react';
import StyledEmptyState from './styles';
import { EmptyStateComponentProps } from './types';

const EmptyStateComponent = ({ align = 'center' }: EmptyStateComponentProps): JSX.Element => {
  return <StyledEmptyState align={align}>내역이 없습니다</StyledEmptyState>;
};

export default EmptyStateComponent;
