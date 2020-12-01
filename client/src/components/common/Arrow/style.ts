import styled from 'styled-components';
import { ArrowPropType } from './types';

const StyledArrow = styled.div<ArrowPropType>`
  display: inline-block;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  transform: rotate(${(props) => props.rotate}deg);
  img {
    height: 100%;
  }
`;

export default StyledArrow;
