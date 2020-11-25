import styled from 'styled-components';
import { PropType } from './types';

const StyledLogo = styled.div`
  height: ${(props: PropType) => props.height};

  svg {
    height: 100%;
  }
`;

export default StyledLogo;
