import React, { useCallback, useEffect, useState } from 'react';
import Header from '@/components/common/layouts/Header';
import GitHubSVG from '@/assets/svg/GitHub.svg';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/modules';
import authorizationAPI from '@/libs/api/Authorization';
import { login } from '@/modules/authorization/actions';
import * as S from './styles';
import { MainLayoutPropsType } from './types';
import LoadingSpinner from '../../LoadingSpinner';

const MainLayout = ({ children }: MainLayoutPropsType): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const createAt = useSelector((state: RootState) => state.authorization.createAt);

  const checkLogin = useCallback(async () => {
    if (!createAt) {
      try {
        const inputCreateAt = await authorizationAPI.isLogin();
        dispatch(login({ createAt: inputCreateAt }));
        setLoading(false);
      } catch (error) {
        history.push('/login');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <S.LayoutWrapper>
          <Header />
          <S.MainContainer>{children}</S.MainContainer>
          <S.Footer>
            &copy; 2020 Boostcamp, AccountBook-F{'  '}
            <a
              className="github-link"
              href="https://github.com/boostcamp-2020/Project16-F-Account-Book"
              target="_blank"
              rel="noreferrer"
            >
              <img src={GitHubSVG} alt="github-logo" />
            </a>
          </S.Footer>
        </S.LayoutWrapper>
      )}
    </>
  );
};

export default MainLayout;
