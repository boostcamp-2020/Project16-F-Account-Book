import React from 'react';
import * as S from './style';
import { InputButtonProps } from './types';

const ModalInputText = (props: InputButtonProps): JSX.Element => {
  const { placeholder, inputType } = props;
  return (
    <>
      <S.TransactionInput
        type={inputType === 'calendar' ? 'date' : 'text'}
        placeholder={placeholder}
        inputType={inputType}
      />
    </>
  );
};

export default ModalInputText;
