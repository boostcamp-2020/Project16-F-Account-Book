import React from 'react';
import CustomButton from '../buttons/CustomButton';
import CustomInput from '../forms/CustomInput';
import * as S from './styles';
import { ManageItemInputProps } from './types';

const MangeItemInput = ({ name }: ManageItemInputProps) => {
  return (
    <S.MangeItemInputContainer>
      <S.MangeInputBoxContinaer>
        <CustomInput inputType="amount" initialValue={name} placeholder={name} />
      </S.MangeInputBoxContinaer>
      <S.MangeButtonContainer>
        <CustomButton color="white" size="s">
          취소
        </CustomButton>
        <CustomButton color="blue" size="s">
          저장
        </CustomButton>
      </S.MangeButtonContainer>
    </S.MangeItemInputContainer>
  );
};

export default MangeItemInput;
