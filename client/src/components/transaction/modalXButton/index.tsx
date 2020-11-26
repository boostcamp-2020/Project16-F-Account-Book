import React from 'react';
import XButton from './style';
import { ModalXButtonProps } from './types';

function ModalXButton({ onClickEvent }: ModalXButtonProps): JSX.Element {
  return <XButton onClick={onClickEvent}>X</XButton>;
}

export default ModalXButton;
