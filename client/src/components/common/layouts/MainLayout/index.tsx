import React from 'react';
import Header from '@/components/common/layouts/Header';
import Authorization from '@container/Authorization';
import StyledMainContainer from './styles';
import { MainLayoutPropsType } from './types';

const MainLayout = ({ children }: MainLayoutPropsType): JSX.Element => {
  return (
    <>
      <Authorization />
      <Header />
      <StyledMainContainer>{children}</StyledMainContainer>
    </>
  );
};

export default MainLayout;
