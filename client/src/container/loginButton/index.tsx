import React from 'react';
import ButtonBox from './style';
import OAuthLoginButton from '../../components/common/buttons/OAuthLoginButton';

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
