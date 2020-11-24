import React from 'react';
import OAuthLoginButton from '.';

export default {
  title: 'components/buttons/OAuthLoginButton',
  component: OAuthLoginButton,
  decorators: [
    (Story: any) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
};

export const GoogleLoginButton = (): JSX.Element => <OAuthLoginButton provider="google" />;

export const NaverLoginButton = (): JSX.Element => <OAuthLoginButton provider="naver" />;

export const KakaoLoginButton = (): JSX.Element => <OAuthLoginButton provider="kakao" />;
