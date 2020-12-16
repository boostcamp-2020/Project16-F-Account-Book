import styled from 'styled-components';
import { StyledAmountTextProps } from './types';

const StyledAmountText = styled.span<StyledAmountTextProps>`
  color: ${(props) => (props.isIncome ? '#4B88C4' : '#c2255c')};
  font-size: ${(props) => props.size};
  font-weight: 600;
`;

export default StyledAmountText;
