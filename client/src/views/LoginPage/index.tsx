import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import Logo from '@/components/common/Logo';
import LoginButton from '@/container/LoginButton';
import { Box, LogoBox } from './styles';

const LoginPage = (props: RouteComponentProps): JSX.Element => {
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
        await axios.get(`${apiBaseUrl}/api/auth/isLogin`, {
          withCredentials: true,
        });
        props.history.push('/dashboard');
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, [props]);
  return (
    <Box>
      <LogoBox>
        <Logo height="150px" />
      </LogoBox>
      <LoginButton />
    </Box>
  );
};

export default LoginPage;
