import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DropdownType } from './types';
import { MenuItem, Item, Button } from './style';

function Dropdown({ dropDownList, LinkPage, getIcon }: DropdownType): JSX.Element {
  const [isShow, setDisplay] = useState(false);
  const dropdownlist = dropDownList.map((v: string, i: number) => (
    <Item>
      <Link
        style={{
          color: '#292929',
          textDecoration: 'none',
        }}
        to={LinkPage[i]}
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
