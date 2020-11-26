import React from 'react';
import Logo from '@components/Logo';
import SelectPage from '@components/User';
import { Link } from 'react-router-dom';
import { warningIcon } from './icons';
import { HeaderDiv, SVG } from './style';

function Header(): JSX.Element {
  return (
    <Link to="/">
      <HeaderDiv>
        <Logo height="100px" />
        <ul>
          <li>hi</li>
        </ul>
        <SVG>{warningIcon}</SVG>
        <SelectPage />
      </HeaderDiv>
    </Link>
  );
}

export default Header;
