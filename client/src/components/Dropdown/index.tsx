import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DropdownType } from './types';
import { MenuItem, Item, Button } from './style';

function Dropdown({ list, getIcon }: DropdownType): JSX.Element {
  const [isShow, setDisplay] = useState(false);
  const dropdownlist = list.map((v: string) => (
    <Item>
      <Link
        style={{
          color: 'black',
          textDecoration: 'none',
        }}
        to="/"
      >
        {v}
      </Link>
    </Item>
  ));
  return (
    <>
      <Button onClick={() => setDisplay(!isShow)}>{getIcon}</Button>
      <MenuItem className={isShow ? 'show' : ''}>
        <ul>{dropdownlist}</ul>
      </MenuItem>
    </>
  );
}

export default Dropdown;
