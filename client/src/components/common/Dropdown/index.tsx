import React, { useState } from 'react';
import { DropdownType } from './types';
import * as S from './styles';

export default function Dropdown({ icon, isRight, children }: DropdownType): JSX.Element {
  const [isShow, setDisplay] = useState(false);
  const classes = [];
  if (isShow) {
    classes.push('show');
  }
  if (isRight) {
    classes.push('right');
  }

  return (
    <>
      <S.Button onClick={() => setDisplay(!isShow)}>{icon}</S.Button>
      <S.MenuItem className={classes.join(' ')}>
        <ul>{children}</ul>
      </S.MenuItem>
    </>
  );
}
