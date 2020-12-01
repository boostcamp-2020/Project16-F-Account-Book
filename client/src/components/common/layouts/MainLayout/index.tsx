import React from 'react';
import Header from '@/components/common/layouts/Header';
import StyledMainContainer from './styles';
import { MainLayoutPropsType } from './types';

const MainLayout = ({ children }: MainLayoutPropsType): JSX.Element => {
  return (
    <>
      <Header />
      <StyledMainContainer>{children}</StyledMainContainer>
    </>
  );
};

export default MainLayout;
