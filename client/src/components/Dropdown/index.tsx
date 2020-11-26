import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownType } from './types';
import { MenuItem, Item, UserButton } from './style';

function Dropdown({ list, getIcon }: DropdownType): JSX.Element {
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
      <UserButton>{getIcon}</UserButton>
      <MenuItem>
        <ul>{dropdownlist}</ul>
      </MenuItem>
    </>
  );
}

export default Dropdown;
