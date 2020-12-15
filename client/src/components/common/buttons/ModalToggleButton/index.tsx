import React from 'react';
import * as S from './styles';
import { ModalToggleButtonProps } from './types';

const ModalToggleButton = ({ setToggle }: ModalToggleButtonProps): JSX.Element => {
  return (
    <S.ModalButton onClick={setToggle}>
      <S.ModalButtonContent>+</S.ModalButtonContent>
    </S.ModalButton>
  );
};

export default ModalToggleButton;
