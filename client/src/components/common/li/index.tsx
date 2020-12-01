import React from 'react';
import { LiType } from './types';
import Item from './style';

export default function liComponent({ name }: LiType): JSX.Element {
  return <Item>{name}</Item>;
}
