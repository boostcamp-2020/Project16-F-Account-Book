import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@components/Logo';
import Dropdown from '@components/Dropdown';

import { HeaderDiv, LogoDiv, SVG, UserButton } from './style';
import { UserIcon } from './icons';

const dropdownList = ['결제수단 관리', '수입분류 관리', '지출분류 관리', '로그아웃'];

function Header(): JSX.Element {
  return (
    <>
      <HeaderDiv>
        <LogoDiv>
          <Link to="/">
            <Logo height="100px" />
          </Link>
        </LogoDiv>
        <UserButton>
          <SVG>{UserIcon}</SVG>
        </UserButton>
        <Dropdown list={dropdownList} />
      </HeaderDiv>
    </>
  );
}

export default Header;
