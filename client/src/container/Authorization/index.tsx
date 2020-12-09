import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/modules';
import authorizationAPI from '@/libs/api/Authorization';
import { login } from '@/modules/authorization/actions';

const Authorization = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const createAt = useSelector((state: RootState) => state.authorization.createAt);
  const checkLogin = useCallback(async () => {
    if (!createAt) {
      try {
        const inputCreateAt = await authorizationAPI.isLogin();
        dispatch(login({ createAt: inputCreateAt }));
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
