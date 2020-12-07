import React, { useEffect, useRef } from 'react';
import CustomButton from '../../common/buttons/CustomButton';
import CustomInput from '../../common/forms/CustomInput';
import * as S from './styles';
import { ManageItemInputProps } from './types';

const ManageItemInput = ({ name, cancelHandler, saveHandler }: ManageItemInputProps) => {
  const inputComponent = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputComponent.current) inputComponent.current.focus();
  }, []);

  return (
    <S.ManageItemInputContainer>
      <S.ManageInputBoxContainer>
        <CustomInput
          inputType="amount"
          initialValue={name}
          placeholder={name}
          ref={inputComponent}
        />
      </S.ManageInputBoxContainer>
      <S.ManageButtonContainer>
        <CustomButton color="white" size="s" onClickEvent={cancelHandler}>
          취소
        </CustomButton>
        <CustomButton color="blue" size="s" onClickEvent={saveHandler}>
          저장
        </CustomButton>
      </S.ManageButtonContainer>
    </S.ManageItemInputContainer>
  );
};

export default ManageItemInput;
