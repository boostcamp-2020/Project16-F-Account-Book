import React from 'react';
import OAuthLoginButton from '@/components/common/buttons/OAuthLoginButton';
import TestLoginButton from '@/components/common/buttons/TestLoginButton';
import * as S from './styles';

const LoginButton = (): JSX.Element => {
  return (
    <>
      <S.StyledButtonBox>
        <OAuthLoginButton provider="google" />
        <OAuthLoginButton provider="naver" />
        <OAuthLoginButton provider="kakao" />
        <S.OrSeparator />
        <TestLoginButton />
      </S.StyledButtonBox>
    </>
  );
};

export default LoginButton;
