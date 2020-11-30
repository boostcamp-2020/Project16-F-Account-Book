import styled from 'styled-components';
import { LogoPropType } from './types';

const StyledLogo = styled.div`
  display: inline-block;
  height: ${(props: LogoPropType) => props.height};
  img {
    height: 100%;
  }
`;

export default StyledLogo;
