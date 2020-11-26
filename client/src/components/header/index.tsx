import React from 'react';
import Logo from '@components/Logo';
import { Link } from 'react-router-dom';
import { warningIcon } from './icons';
import { HeaderDiv, SVG } from './style';

function Header(): JSX.Element {
  return (
    <Link to="/">
      <HeaderDiv>
        <Logo height="100px" />
        <SVG>{warningIcon}</SVG>
      </HeaderDiv>
    </Link>
  );
}

export default Header;
