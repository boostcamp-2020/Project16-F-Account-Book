import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/modules';

const Authorization = (): JSX.Element => {
  const history = useHistory();
  const isLoggedIn = useSelector((state: RootState) => state.authorization.isLoggedIn);
  const checkLogin = useCallback(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
  }, []);
  useEffect(() => {
    checkLogin();
  }, []);
  return <></>;
};

export default Authorization;
