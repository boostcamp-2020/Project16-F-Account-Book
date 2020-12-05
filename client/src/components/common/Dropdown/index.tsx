import React, { useState, useEffect, useRef } from 'react';
import { DropdownType } from './types';
import * as S from './styles';

export default function Dropdown({ icon, isRight, children }: DropdownType): JSX.Element {
  const iconDiv: any = useRef();
  const [isShow, setDisplay] = useState(false);
  const position = isRight ? 'right' : '';

  const handleClickOutside = ({ target }: any) => {
    if (!isShow && iconDiv.current.contains(target)) {
      setDisplay(true);
    } else setDisplay(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  });
  return (
    <>
      <S.IconDiv ref={iconDiv}>{icon}</S.IconDiv>
      {isShow && (
        <S.MenuItem className={position}>
          <ul>{children}</ul>
        </S.MenuItem>
      )}
    </>
  );
}
