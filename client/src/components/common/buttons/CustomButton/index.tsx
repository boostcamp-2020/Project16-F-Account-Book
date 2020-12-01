import React from 'react';
import * as S from './styles';
import { CustomButtonProps } from './types';

function CustomButton(props: CustomButtonProps): JSX.Element {
  const { image, children, color, onClickEvent } = props;

  return (
    <S.Button onClick={onClickEvent} color={color}>
      {image ? (
        <>
          <S.ButtonImg />
          <S.ButtonContent color={color}>{children}</S.ButtonContent>
        </>
      ) : (
        <S.ButtonContent color={color}>{children}</S.ButtonContent>
      )}
    </S.Button>
  );
}

export default CustomButton;
