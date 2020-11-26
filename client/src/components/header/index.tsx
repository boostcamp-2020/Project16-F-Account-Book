import React from 'react';
import Logo from '@components/Logo';
import { Link } from 'react-router-dom';
import HeaderDiv from './style';

function Header(): JSX.Element {
  return (
    <Link to="/">
      <HeaderDiv>
        <Logo height="80px" />
      </HeaderDiv>
    </Link>
  );
}

export default Header;
