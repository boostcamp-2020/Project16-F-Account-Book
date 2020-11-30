import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, Item } from './style';
import { SelectPagePropType } from './types';

function SelectPage({ display }: SelectPagePropType): JSX.Element {
  return (
    <MenuItem display={display}>
      <ul>
        <Item>
          <Link
            style={{
              color: 'black',
              textDecoration: 'none',
            }}
            to="/"
          >
            결제수단 관리
          </Link>
        </Item>
        <Item>
          <Link
            style={{
              color: 'black',
              textDecoration: 'none',
            }}
            to="/"
          >
            수입분류 관리
          </Link>
        </Item>
        <Item>
          <Link
            style={{
              color: 'black',
              textDecoration: 'none',
            }}
            to="/"
          >
            지출분류 관리
          </Link>
        </Item>
        <Item>
          <Link
            style={{
              color: 'black',
              textDecoration: 'none',
            }}
            to="/"
          >
            로그아웃
          </Link>
        </Item>
      </ul>
    </MenuItem>
  );
}

export default SelectPage;
