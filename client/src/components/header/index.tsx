import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@components/Logo';
import Dropdown from '@container/header/index';

import { HeaderDiv, LogoDiv, DropDiv } from './style';
import { UserIcon } from './icons';

export default function Header(): JSX.Element {
  const dropDownList = ['결제수단 관리', '수입분류 관리', '지출분류 관리', '로그아웃'];
  const linkPage = ['PayMent', 'imPortClassification', 'ExpenditureClassification', ''];
  return (
    <>
      <HeaderDiv>
        <LogoDiv>
          <Link to="/">
            <Logo height="100px" />
          </Link>
        </LogoDiv>
        <DropDiv>
          <Dropdown dropDownList={dropDownList} LinkPage={linkPage} getIcon={UserIcon} />
        </DropDiv>
      </HeaderDiv>
    </>
  );
}
