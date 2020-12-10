import React from 'react';
import Header from '@/components/common/layouts/Header';
import Authorization from '@container/Authorization';
import GitHubSVG from '@/assets/svg/GitHub.svg';
import * as S from './styles';
import { MainLayoutPropsType } from './types';

const MainLayout = ({ children }: MainLayoutPropsType): JSX.Element => {
  return (
    <>
      <Authorization />
      <S.LayoutWrapper>
        <Header />
        <S.MainContainer>{children}</S.MainContainer>
        <S.Footer>
          &copy; 2020 Boostcamp, AccountBook-F{'  '}
          <a
            className="github-link"
            href="https://github.com/boostcamp-2020/Project16-F-Account-Book"
            target="_blank"
            rel="noreferrer"
          >
            <img src={GitHubSVG} alt="github-logo" />
          </a>
        </S.Footer>
      </S.LayoutWrapper>
    </>
  );
};

export default MainLayout;
