import { oAuthConfig } from '@config/index';
import { Context } from 'koa';

export default class OAuthClient {
  private config;

  private provider;

  constructor(provider: 'google' | 'naver' | 'kakao') {
    this.provider = provider;
    this.config = oAuthConfig[provider];
  }

  public redirectToAuthorizaionPage(ctx: Context): void {
    let authorizationUri = `${this.config.authorizationUri}?client_id=${this.config.clientId}&response_type=code&redirect_uri=${this.config.callbackUri}`;
    if (this.provider === 'google') {
      authorizationUri +=
        '&scope=openid%20email%20profile&access_type=online&include_granted_scopes=true';
    }
    ctx.redirect(authorizationUri);
  }
}
