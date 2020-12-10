import styled from 'styled-components';
import { ButtonProps } from './types';

export const Button = styled.button<ButtonProps>`
  box-shadow: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.size === 'sm' ? '1.7rem' : '2rem')};
  font-size: ${(props) => (props.size === 'sm' ? 'small' : 'medium')};
  border-radius: 5px;
  background-color: ${(props) => (props.color === 'white' ? 'white' : '#0E7EE0')};
  border: 1px solid #767676;
  cursor: pointer;
`;

export const ButtonImg = styled.img`
  display: flex;
  width: 1rem;
  height: 1rem;
  margin: 0.1rem;
`;

export const ButtonContent = styled.div<ButtonProps>`
  display: flex;
  color: ${(props) => (props.color === 'white' ? 'black' : 'white')};
`;
