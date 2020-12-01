import React from 'react';
import { Link } from 'react-router-dom';
import { LinkType } from './types';

export default function LinkComponent({ linkPage, children }: LinkType): JSX.Element {
  return (
    <Link
      style={{
        color: '#292929',
        textDecoration: 'none',
      }}
      to={linkPage}
    >
      {children}
    </Link>
  );
}
