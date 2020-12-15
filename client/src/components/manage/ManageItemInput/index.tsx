import React, { useEffect, useRef } from 'react';
import CustomButton from '@/components/common/buttons/CustomButton';
import CustomInput from '@/components/common/forms/CustomInput';
import * as S from './styles';
import { ManageItemInputProps } from './types';

const ManageItemInput = ({
  name,
  cancelHandler,
  saveHandler,
  onChangeInput,
  border,
  isValid,
}: ManageItemInputProps): JSX.Element => {
  const inputComponent = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputComponent.current) inputComponent.current.focus();
  }, []);

  return (
    <S.ManageItemInputContainer border={border}>
      <S.ManageInputBoxContainer>
        <CustomInput
          inputType="amount"
          initialValue={name}
          placeholder={name}
          ref={inputComponent}
          onChange={onChangeInput}
        />
      </S.ManageInputBoxContainer>
      <S.ManageButtonContainer>
        <CustomButton color="white" size="sm" onClickEvent={cancelHandler}>
          취소
        </CustomButton>
        <CustomButton isValid={isValid} color="blue" size="sm" onClickEvent={saveHandler}>
          저장
        </CustomButton>
      </S.ManageButtonContainer>
    </S.ManageItemInputContainer>
  );
};

export default ManageItemInput;
