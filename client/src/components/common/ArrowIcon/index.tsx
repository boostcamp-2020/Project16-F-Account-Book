import React from 'react';
import ArrowSVG from '@/assets/svg/Arrow.svg';
import StyledArrow from './styles';
import { ArrowPropType } from './types';

function ArrowIcon({ height, width, rotate }: ArrowPropType): JSX.Element {
  return (
    <StyledArrow height={height} width={width} rotate={rotate}>
      <img src={ArrowSVG} alt="arrow" />
    </StyledArrow>
  );
}

export default ArrowIcon;
