import React from 'react';
import * as S from './styles';
import { ModalRadioButtonProps } from './types';

function ModalRadioButton({ setIsIncome }: ModalRadioButtonProps): JSX.Element {
  const onChangeRadioButton = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const { value } = event.target;
    const isIncome = value === 'income';
    setIsIncome(isIncome);
  };

  return (
    <S.RadioButtonContainer>
      <S.RadioButtonWrapper>
        <S.RadioButton type="radio" name="isIncome" value="income" onChange={onChangeRadioButton} />{' '}
        수입
      </S.RadioButtonWrapper>
      <S.RadioButtonWrapper>
        <S.RadioButton
          type="radio"
          name="isIncome"
          value="expenditure"
          onChange={onChangeRadioButton}
        />{' '}
        지출
      </S.RadioButtonWrapper>
    </S.RadioButtonContainer>
  );
}

export default ModalRadioButton;
