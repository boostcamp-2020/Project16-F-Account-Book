import React from 'react';
import * as S from './styles';
import { ModalRadioButtonProps } from './types';

function ModalRadioButton({ setIsIncome, onChange, value }: ModalRadioButtonProps): JSX.Element {
  const onChangeRadioButton = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: targetValue } = event.target;
    const isIncome = targetValue === 'true';
    setIsIncome(isIncome);
    onChange(event);
  };

  return (
    <S.RadioButtonContainer>
      <S.RadioButtonWrapper>
        <S.RadioButton
          type="radio"
          name="isIncome"
          value="false"
          onChange={onChangeRadioButton}
          defaultChecked
          checked={!value}
        />{' '}
        지출
      </S.RadioButtonWrapper>
      <S.RadioButtonWrapper>
        <S.RadioButton
          type="radio"
          name="isIncome"
          value="true"
          onChange={onChangeRadioButton}
          checked={!!value}
        />
        수입
      </S.RadioButtonWrapper>
    </S.RadioButtonContainer>
  );
}

export default ModalRadioButton;
