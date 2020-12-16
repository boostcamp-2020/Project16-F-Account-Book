import React from 'react';
import * as S from './styles';
import { CustomButtonProps } from './types';

const CustomButton = (props: CustomButtonProps): JSX.Element => {
  const { image, children, color, size, onClickEvent, isValid } = props;
  const isDisabled = isValid === undefined ? false : !isValid;
  return (
    <S.Button disabled={isDisabled} onClick={onClickEvent} color={color} size={size}>
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
