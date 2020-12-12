import React, { useState } from 'react';
import { DropdownType } from './types';
import * as S from './styles';

const Dropdown = ({ icon, isRight, children }: DropdownType): JSX.Element => {
  const [isShow, setDisplay] = useState(false);
  const position = isRight ? 'right' : '';

  const toggleDropdown = () => {
    setDisplay(!isShow);
  };
  return (
    <>
      <S.IconDiv onClick={toggleDropdown}>{icon}</S.IconDiv>
      {isShow && (
        <>
          <S.CloseDiv onClick={toggleDropdown} />
          <S.MenuItem className={position} onClick={toggleDropdown}>
            <ul>{children}</ul>
          </S.MenuItem>
        </>
      )}
    </>
  );
};

export default Dropdown;
