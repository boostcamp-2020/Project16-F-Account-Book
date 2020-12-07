import React, { useState } from 'react';
import { DropdownType } from './types';
import * as S from './styles';

export default function Dropdown({ icon, isRight, children }: DropdownType): JSX.Element {
  const [isShow, setDisplay] = useState(false);
  const position = isRight ? 'right' : '';

  const onClick = () => {
    setDisplay(!isShow);
  };
  const dropdownOff = () => {
    setDisplay(false);
  };
  return (
    <>
      <S.IconDiv onClick={onClick}>{icon}</S.IconDiv>
      {isShow && (
        <S.MenuItem className={position}>
          <ul>{children}</ul>
        </S.MenuItem>
      )}
      {isShow && <S.CloseDiv onClick={dropdownOff} />}
    </>
  );
}
