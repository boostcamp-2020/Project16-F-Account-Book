import React from 'react';
import OAuthLoginButton from '@/components/common/buttons/OAuthLoginButton';
import ButtonBox from './style';

const LoginButton = (): JSX.Element => {
  return (
    <ButtonBox>
      <OAuthLoginButton provider="google" />
      <OAuthLoginButton provider="naver" />
      <OAuthLoginButton provider="kakao" />
    </ButtonBox>
  );
};

export default LoginButton;
