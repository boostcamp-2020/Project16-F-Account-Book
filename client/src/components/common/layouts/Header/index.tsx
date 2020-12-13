import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '@/components/common/Logo';
import Dropdown from '@/components/common/Dropdown';
import authorizationAPI from '@/libs/api/Authorization';
import CircleUserSVG from '@/assets/svg/CircleUser.svg';
import { useDispatch } from 'react-redux';
import { logout } from '@/modules/authorization/actions';
import * as S from './styles';

const HeaderDropdownIcon = (
  <img src={CircleUserSVG} alt="settings-button" width="24px" height="24px" />
);
function Header(): JSX.Element {
  const list = ['결제수단 관리', '카테고리 관리'];
  const linkPageList = ['manage-payment', 'manage-category'];
  const dropdonwList = list.map((v: string, i: number) => (
    <S.Item key={`header${i.toString()}`}>
      <Link to={linkPageList[i]}>{v}</Link>
    </S.Item>
  ));
  const dispatch = useDispatch();
  const history = useHistory();
  const onClick = async () => {
    await authorizationAPI.logout();
    history.push('/');
    dispatch(logout({ createAt: null }));
  };
  return (
    <S.HeaderDiv>
      <S.HeaderContentDiv>
        <S.HeaderLogo>
          <Link to="/dashboard">
            <Logo height="20px" />
          </Link>
        </S.HeaderLogo>
        <S.DropDiv>
          <Dropdown icon={HeaderDropdownIcon} isRight>
            {dropdonwList}
            <S.Item onClick={onClick} key="headerLogout">
              로그아웃
            </S.Item>
          </Dropdown>
        </S.DropDiv>
      </S.HeaderContentDiv>
    </S.HeaderDiv>
  );
}

export default React.memo(Header);
