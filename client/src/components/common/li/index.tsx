import React from 'react';
import { DropdownType } from './types';
import Item from './style';

export default function DropdownList({ name }: DropdownType): JSX.Element {
  return <Item>{name}</Item>;
}
