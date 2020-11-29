import React, { useState } from 'react';
import { DropdownType } from './types';
import { MenuItem, Button } from './style';

export default function Dropdown({ getIcon, dropDownList }: DropdownType): JSX.Element {
  const [isShow, setDisplay] = useState(false);
  return (
    <>
      <Button onClick={() => setDisplay(!isShow)}>{getIcon}</Button>
      <MenuItem className={isShow ? 'show' : ''}>
        <ul>{dropDownList}</ul>
      </MenuItem>
    </>
  );
}
