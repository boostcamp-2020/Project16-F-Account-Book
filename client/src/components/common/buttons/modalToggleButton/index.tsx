import React from 'react';
import * as S from './style';
import { ModalToggleButtonProps } from './types';

function ModalToggleButton({ setToggle }: ModalToggleButtonProps): JSX.Element {
  return (
    <S.ModalButton onClick={setToggle}>
      <S.ModalButtonContent>+</S.ModalButtonContent>
    </S.ModalButton>
  );
}

export default ModalToggleButton;
