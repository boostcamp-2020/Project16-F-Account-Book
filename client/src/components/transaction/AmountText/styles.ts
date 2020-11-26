import styled from 'styled-components';
import { StyledAmountTextProps } from './types';

const StyledAmountText = styled.span<StyledAmountTextProps>`
  color: ${(props) => (props.isIncome ? '#4B88C4' : '#0F0F0F')};
  font-size: ${(props) => (props.size === 'lg' ? '1.5rem' : '1rem')};
  font-weight: 600;
`;

export default StyledAmountText;
