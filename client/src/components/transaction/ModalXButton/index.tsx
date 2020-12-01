import React from 'react';
import XButton from './styles';
import { ModalXButtonProps } from './types';

function ModalXButton({ onClickEvent }: ModalXButtonProps): JSX.Element {
  return <XButton onClick={onClickEvent}>X</XButton>;
}

export default ModalXButton;
