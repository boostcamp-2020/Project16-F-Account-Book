import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '@components/common/Logo';
import DropdownList from '@components/Dropdown';
import LinkComponent from '@components/common/typeComponent/Link';
import Dropdown from '@container/Dropdown';

import CircleUserSVG from '@/assets/svg/CircleUser.svg';
import { HeaderDiv, HeaderContentDiv, HeaderLogo, DropDiv } from './style';

const HeaderDropdownIcon = (
  <img src={CircleUserSVG} alt="settings-button" width="24px" height="24px" />
);

export default function Header(): JSX.Element {
  const list = ['결제수단 관리', '수입분류 관리', '지출분류 관리', '로그아웃'];
  const linkPageList = ['PayMent', 'imPortClassification', 'ExpenditureClassification', ''];
  const dropDonwList = list.map((v: string, i: number) => (
    <LinkComponent linkPage={linkPageList[i]} name={<DropdownList name={v} />} />
  ));

  return (
    <HeaderDiv>
      <HeaderContentDiv>
        <HeaderLogo>
          <Link to="/">
            <Logo height="35px" />
          </Link>
        </HeaderLogo>
        <DropDiv>
          <Dropdown icon={HeaderDropdownIcon}>{dropDonwList}</Dropdown>
        </DropDiv>
      </HeaderContentDiv>
    </HeaderDiv>
  );
}
