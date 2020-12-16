import React from 'react';
import endpoints from '@/commons/endpoints';
import LoginButtonResourceFactory from './buttonResourceFactory';
import { PropsType } from './types';

const OAuthLoginButton = ({ provider }: PropsType): JSX.Element => {
  const { Button, text } = LoginButtonResourceFactory.getButtonResource(provider);
  const clickHandler = () => {
    window.location.href = `${endpoints.API_BASE_URL}${endpoints.AUTH_API}/${provider}`;
  };

  return <Button onClick={clickHandler}>{text}</Button>;
};

export default OAuthLoginButton;
