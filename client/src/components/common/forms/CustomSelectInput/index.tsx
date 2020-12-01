import React from 'react';
import { SelectInputProps } from './types';
import * as S from './style';

function CustomSelectInput({ children, placeHolder }: SelectInputProps): JSX.Element {
  return (
    <S.SelectInput>
      <S.SelectOption value="" selected hidden disabled>
        {placeHolder}
      </S.SelectOption>
      {children?.map((option) => (
        <S.SelectOption value={`${option.id}`} key={`select${option.id}`}>
          {option.name}
        </S.SelectOption>
      ))}
    </S.SelectInput>
  );
}

export default CustomSelectInput;
