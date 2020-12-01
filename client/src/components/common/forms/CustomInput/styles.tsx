import styled from 'styled-components';
import { InputButtonProps } from './types';

const StyledInput = styled.input<InputButtonProps>`
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  font-size: 1rem;
  justify-content: flex-start;
  padding: 0.2rem 0.2rem;
  width: 100%;
  height: ${(props) => (props.inputType === 'description' ? '4.5rem' : '1.5rem')};
  min-width: 5px;
  resize: none;
  margin: 0.5rem 0rem;
  border: 1px solid #767676;
`;

export default StyledInput;
