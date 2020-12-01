import React from 'react';
import OAuthLoginButton from '@/components/common/buttons/OAuthLoginButton';
import StyledButtonBox from './styles';

const LoginButton = (): JSX.Element => {
  return (
    <StyledButtonBox>
      <OAuthLoginButton provider="google" />
      <OAuthLoginButton provider="naver" />
      <OAuthLoginButton provider="kakao" />
    </StyledButtonBox>
  );
};

export default LoginButton;
