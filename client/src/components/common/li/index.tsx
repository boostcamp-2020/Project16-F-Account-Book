import React from 'react';
import { DropdownType } from './types';
import Item from './style';

export default function liList({ name }: DropdownType): JSX.Element {
  return <Item>{name}</Item>;
}
