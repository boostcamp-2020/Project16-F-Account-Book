import React, { useState } from 'react';
import { DropdownType } from './types';
import { MenuItem, Button } from './style';

export default function Dropdown({ icon, dropDownList }: DropdownType): JSX.Element {
  const [isShow, setDisplay] = useState(false);
  return (
    <>
      <Button onClick={() => setDisplay(!isShow)}>{icon}</Button>
      <MenuItem className={isShow ? 'show' : ''}>
        <ul>{dropDownList}</ul>
      </MenuItem>
    </>
  );
}
