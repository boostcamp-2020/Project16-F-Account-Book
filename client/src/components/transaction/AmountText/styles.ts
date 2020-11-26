import styled from 'styled-components';
import { StyledAmountTextProps } from './types';

const StyledAmountText = styled.span`
  color: ${(props: StyledAmountTextProps) => (props.isIncome ? '#4B88C4' : '#0F0F0F')};
  font-weight: 600;
`;

export default StyledAmountText;
