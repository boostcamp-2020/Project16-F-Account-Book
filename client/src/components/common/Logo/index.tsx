import React from 'react';
import LogoSVG from '@/assets/svg/Logo.svg';
import { LogoPropType } from './types';
import StyledLogo from './styles';

function Logo({ height }: LogoPropType): JSX.Element {
  return (
    <StyledLogo height={height}>
      <img src={LogoSVG} alt="logo" />
    </StyledLogo>
  );
}

export default Logo;
