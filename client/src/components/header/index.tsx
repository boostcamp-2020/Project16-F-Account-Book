import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@components/Logo';
import DropdownList from '@components/Dropdown';
import LinkComponent from '@components/common/typeComponent/Link';
import Dropdown from '@container/Dropdown';

import { HeaderDiv, LogoDiv, DropDiv } from './style';
import { UserIcon } from './icons';

export default function Header(): JSX.Element {
  const list = ['결제수단 관리', '수입분류 관리', '지출분류 관리', '로그아웃'];
  const linkPageList = ['PayMent', 'imPortClassification', 'ExpenditureClassification', ''];
  const dropDonwList = list.map((v: string, i: number) => (
    <LinkComponent linkPage={linkPageList[i]} name={<DropdownList name={v} />} />
  ));

  return (
    <>
      <HeaderDiv>
        <LogoDiv>
          <Link to="/">
            <Logo height="100px" />
          </Link>
        </LogoDiv>
        <DropDiv>
          <>
            <Dropdown icon={UserIcon}>{dropDonwList}</Dropdown>
          </>
        </DropDiv>
      </HeaderDiv>
    </>
  );
}
