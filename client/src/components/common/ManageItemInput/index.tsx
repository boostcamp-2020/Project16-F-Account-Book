import React, { useEffect, useRef } from 'react';
import CustomButton from '../buttons/CustomButton';
import CustomInput from '../forms/CustomInput';
import * as S from './styles';
import { ManageItemInputProps } from './types';

const MangeItemInput = ({ name, cancelHandler, saveHandler }: ManageItemInputProps) => {
  const inputComponent = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputComponent.current) inputComponent.current.focus();
  }, []);

  return (
    <S.MangeItemInputContainer>
      <S.MangeInputBoxContainer>
        <CustomInput
          inputType="amount"
          initialValue={name}
          placeholder={name}
          ref={inputComponent}
        />
      </S.MangeInputBoxContainer>
      <S.MangeButtonContainer>
        <CustomButton color="white" size="s" onClickEvent={cancelHandler}>
          취소
        </CustomButton>
        <CustomButton color="blue" size="s" onClickEvent={saveHandler}>
          저장
        </CustomButton>
      </S.MangeButtonContainer>
    </S.MangeItemInputContainer>
  );
};

export default MangeItemInput;
