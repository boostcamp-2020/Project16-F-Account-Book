import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@components/common/Logo';
import Dropdown from '@/components/common/Dropdown';

import CircleUserSVG from '@/assets/svg/CircleUser.svg';
import * as S from './styles';

const HeaderDropdownIcon = (
  <img src={CircleUserSVG} alt="settings-button" width="24px" height="24px" />
);
function Header(): JSX.Element {
  const list = ['결제수단 관리', '수입분류 관리', '지출분류 관리', '로그아웃'];
  const linkPageList = ['PayMent', 'imPortClassification', 'ExpenditureClassification', ''];
  const dropdonwList = list.map((v: string, i: number) => (
    <S.Item>
      <Link
        style={{
          color: '#292929',
          textDecoration: 'none',
        }}
        to={linkPageList[i]}
      >
        {v}
      </Link>
    </S.Item>
  ));

  return (
    <S.HeaderDiv>
      <S.HeaderContentDiv>
        <S.HeaderLogo>
          <Link to="/">
            <Logo height="35px" />
          </Link>
        </S.HeaderLogo>
        <S.DropDiv>
          <Dropdown icon={HeaderDropdownIcon} isRight>
            {dropdonwList}
          </Dropdown>
        </S.DropDiv>
      </S.HeaderContentDiv>
    </S.HeaderDiv>
  );
}

export default React.memo(Header);
