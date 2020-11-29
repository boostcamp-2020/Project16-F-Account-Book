import React from 'react';
import { Link } from 'react-router-dom';
import { LinkType } from './types';

export default function LinkComponent({ LinkPage, name }: LinkType): JSX.Element {
  return (
    <Link
      style={{
        color: '#292929',
        textDecoration: 'none',
      }}
      to={LinkPage}
    >
      {name}
    </Link>
  );
}
