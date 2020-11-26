import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownType } from './types';
import { MenuItem, Item } from './style';

function Dropdown({ list }: DropdownType): JSX.Element {
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
    <MenuItem>
      <ul>{dropdownlist}</ul>
    </MenuItem>
  );
}

export default Dropdown;
