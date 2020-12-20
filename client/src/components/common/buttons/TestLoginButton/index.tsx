import endpoints from '@/commons/endpoints';
import React from 'react';
import StyledTestLoginButton from './styles';

const TestLoginButton = (): JSX.Element => {
  const testLogin = () => {
    window.location.href = `${endpoints.API_BASE_URL}${endpoints.AUTH_API}/test-login`;
  };

  return <StyledTestLoginButton onClick={testLogin}>demo 계정으로 로그인</StyledTestLoginButton>;
};

export default TestLoginButton;
