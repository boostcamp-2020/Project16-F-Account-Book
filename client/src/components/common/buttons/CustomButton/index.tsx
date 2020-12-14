import React from 'react';
import * as S from './styles';
import { CustomButtonProps } from './types';

const CustomButton = (props: CustomButtonProps): JSX.Element => {
  const { image, children, color, size, onClickEvent, validation } = props;

  return (
    <S.Button disabled={validation} onClick={onClickEvent} color={color} size={size}>
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
};

export default CustomButton;
