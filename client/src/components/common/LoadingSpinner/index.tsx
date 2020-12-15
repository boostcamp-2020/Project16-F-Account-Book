import React from 'react';
import Spinner from '@/assets/svg/Spinner.svg';
import StyledLoadingSpinner from './styles';

const LoadingSpinner = (): JSX.Element => {
  return (
    <StyledLoadingSpinner>
      <img src={Spinner} alt="loading..." />
    </StyledLoadingSpinner>
  );
};

export default LoadingSpinner;
