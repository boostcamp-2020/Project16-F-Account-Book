import React, { useState } from 'react';
import Logo from '@components/Logo';
import SelectPage from '@components/User';
import { Link } from 'react-router-dom';
import { UserIcon } from './icons';
import { HeaderDiv, SVG, DropDown, LogoDiv } from './style';

function Header(): JSX.Element {
  const [display, setDisplay] = useState('none');
  return (
    <>
      <HeaderDiv>
        <LogoDiv>
          <Link to="/">
            <Logo height="100px" />
          </Link>
        </LogoDiv>
        <DropDown onClick={() => setDisplay(display === 'none' ? 'float' : 'none')}>
          <SVG>{UserIcon}</SVG>
        </DropDown>
      </HeaderDiv>
      <SelectPage display={display} />
    </>
  );
}

export default Header;
