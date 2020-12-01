import React from 'react';
import endpoints from '@/libs/endpoints';
import LoginButtonResourceFactory from './buttonResourceFactory';

type PropsType = {
  provider: 'google' | 'naver' | 'kakao';
};

function OAuthLoginButton({ provider }: PropsType): JSX.Element {
  const { Button, text } = LoginButtonResourceFactory.getButtonResource(provider);
  const clickHandler = () => {
    window.location.href = `${endpoints.API_BASE_URL}${endpoints.AUTH_API}/${provider}`;
  };

  return <Button onClick={clickHandler}>{text}</Button>;
}

export default OAuthLoginButton;
