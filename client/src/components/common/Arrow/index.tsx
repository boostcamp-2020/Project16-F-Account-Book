import React from 'react';
import ArrowSVG from '@/assets/svg/arrow.svg';
import StyledArrow from './style';
import { ArrowPropType } from './types';

function Arrow({ height, width, rotate }: ArrowPropType): JSX.Element {
  return (
    <StyledArrow height={height} width={width} rotate={rotate}>
      <img src={ArrowSVG} alt="arrow" />
    </StyledArrow>
  );
}

export default Arrow;
