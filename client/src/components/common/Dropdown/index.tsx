import React, { useState } from 'react';
import { DropdownType } from './types';
import { MenuItem, Button } from './style';

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
      <Button onClick={() => setDisplay(!isShow)}>{icon}</Button>
      <MenuItem className={classes.join(' ')}>
        <ul>{children}</ul>
      </MenuItem>
    </>
  );
}
