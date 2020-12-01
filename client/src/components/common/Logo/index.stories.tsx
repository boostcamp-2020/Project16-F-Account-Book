import React from 'react';
import Logo from '.';

export default {
  title: 'components/Logo',
  component: Logo,
};

export const LogoWithHeight50px = (): JSX.Element => <Logo height="50px" />;

export const LogoWithHeight150px = (): JSX.Element => <Logo height="150px" />;

export const LogoWithHeight300px = (): JSX.Element => <Logo height="300px" />;
