import React from 'react';
import Box from './style';
import Logo from '../../components/Logo';
import LoginButton from '../../container/loginButton';

const LoginPage = (): JSX.Element => {
  return (
    <Box>
      <Logo height="150px" />
      <LoginButton />
    </Box>
  );
};

export default LoginPage;
