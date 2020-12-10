import styled from 'styled-components';
import { StyledAmountTextProps } from './types';

const StyledAmountText = styled.span<StyledAmountTextProps>`
  color: ${(props) => (props.isIncome ? '#4B88C4' : '#c2255c')};
  font-size: ${(props) => {
    if (props.size === 'lg') {
      return '1.5rem';
    }
    if (props.size === 'sm') {
      return '0.9rem';
    }
    if (props.size === 'xs') {
      return '0.5rem';
    }
    if (props.size === '') {
      return '1rem';
    }
    return `${props.size}`;
  }};
  font-weight: 600;
`;

export default StyledAmountText;
