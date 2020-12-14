import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import authorizationAPI from '@/libs/api/Authorization';
import Logo from '@/components/common/Logo';
import LoginButton from '@/container/LoginButton';
import { useDispatch } from 'react-redux';
import { login } from '@/modules/authorization/actions';
import * as S from './styles';

const LoginPage = (props: RouteComponentProps): JSX.Element => {
  const dispatch = useDispatch();

  const checkLogin = useCallback(async () => {
    try {
      const createAt = await authorizationAPI.isLogin();
      dispatch(login({ createAt }));
      props.history.push('/');
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    checkLogin();
  }, [props]);
  return (
    <S.Box>
      <S.LogoBox>
        <Logo height="95px" />
      </S.LogoBox>
      <LoginButton />
    </S.Box>
  );
};

export default LoginPage;
