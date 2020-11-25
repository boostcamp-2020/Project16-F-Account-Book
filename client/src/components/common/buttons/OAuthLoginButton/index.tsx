import React from 'react';
import LoginButtonResourceFactory from './buttonResourceFactory';

type PropsType = {
  provider: 'google' | 'naver' | 'kakao';
};

function OAuthLoginButton({ provider }: PropsType): JSX.Element {
  const { Button, text } = LoginButtonResourceFactory.getButtonResource(provider);
  const clickHandler = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    window.location.href = `${apiBaseUrl}/api/auth/${provider}`;
  };

  return <Button onClick={clickHandler}>{text}</Button>;
}

export default OAuthLoginButton;
