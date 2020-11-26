import styled from 'styled-components';
import { InputButtonProps } from './types';

export const TransactionInput = styled.input<InputButtonProps>`
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  font-size: 1rem;
  justify-content: flex-start;
  padding: 0.2rem 0.3rem;
  width: 95%;
  height: ${(props) => (props.inputType === 'description' ? '4.5rem' : '1.5rem')};
  min-width: 5px;
  resize: none;
  margin: 0.5rem 0rem;
`;

export const something = styled.div``;
