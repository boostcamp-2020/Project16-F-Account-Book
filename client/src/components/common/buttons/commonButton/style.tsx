import styled from 'styled-components';
import { ButtonColorProps } from './types';

export const Button = styled.button<ButtonColorProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 3.5rem;
  height: 2rem;
  border-radius: 5px;
  background-color: ${(props) => (props.color === 'white' ? 'white' : '#0E7EE0')};
`;

export const ButtonImg = styled.img`
  display: flex;
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
`;

export const ButtonContent = styled.div<ButtonColorProps>`
  display: flex;
  color: ${(props) => (props.color === 'white' ? 'black' : 'white')};
`;
