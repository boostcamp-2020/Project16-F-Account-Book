import styled from 'styled-components';
import { LogoPropType } from './types';

const StyledLogo = styled.div`
  height: ${(props: LogoPropType) => props.height};
  svg {
    height: 100%;
  }
`;

export default StyledLogo;
