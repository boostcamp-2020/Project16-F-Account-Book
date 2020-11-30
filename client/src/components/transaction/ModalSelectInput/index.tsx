import React from 'react';
import { ModalSelectInputProps } from './types';
import * as S from './style';

function ModalSelectInput({ children, placeHolder }: ModalSelectInputProps): JSX.Element {
  return (
    <S.ModalSelectInput>
      <S.ModalSelectOption value="" selected hidden disabled>
        {placeHolder}
      </S.ModalSelectOption>
      {children.map((option) => (
        <S.ModalSelectOption value={`${option.id}`} key={option.id}>
          {option.name}
        </S.ModalSelectOption>
      ))}
    </S.ModalSelectInput>
  );
}

export default ModalSelectInput;
