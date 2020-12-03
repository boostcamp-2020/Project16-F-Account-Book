import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/modules';
import authorizationAPI from '@/libs/api/Authorization';
import { login } from '@/modules/authorization/actions';

const Authorization = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.authorization.isLoggedIn);
  const checkLogin = useCallback(async () => {
    if (!isLoggedIn) {
      try {
        await authorizationAPI.isLogin();
        dispatch(login());
      } catch (error) {
        console.log(error);
        history.push('/');
      }
    }
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);
  return <></>;
};

export default Authorization;
