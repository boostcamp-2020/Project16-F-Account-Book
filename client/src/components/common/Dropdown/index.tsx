import React, { useState } from 'react';
import { DropdownType } from './types';
import { MenuItem, Button } from './style';

export default function Dropdown({ icon, children }: DropdownType): JSX.Element {
  const [isShow, setDisplay] = useState(false);
  return (
    <>
      <Button onClick={() => setDisplay(!isShow)}>{icon}</Button>
      <MenuItem className={isShow ? 'show' : ''}>
        <ul>{children}</ul>
      </MenuItem>
    </>
  );
}
