import React from 'react';
import * as S from './style';

function ModalRadioButton(): JSX.Element {
  return (
    <S.RadioButtonContainer>
      <S.RadioButtonWrapper>
        <S.RadioButton type="radio" name="isIncome" value="수입" /> 수입
      </S.RadioButtonWrapper>
      <S.RadioButtonWrapper>
        <S.RadioButton type="radio" name="isIncome" value="지출" /> 지출
      </S.RadioButtonWrapper>
    </S.RadioButtonContainer>
  );
}

export default ModalRadioButton;
