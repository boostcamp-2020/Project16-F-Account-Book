import { oAuthConfig } from '@/config/index';
import { Context } from 'koa';
import axios from 'axios';
import * as qs from 'querystring';
import SocialUserDTO from '@/domain/auth/types/social-user-dto';
import GoogleUserDTO from '@/domain/auth/types/google-user-dto';
import NaverUserDTO from '@/domain/auth/types/naver-user-dto';
import KakaoUserDTO from '@/domain/auth/types/kakao-user-dto';

export default class OAuthClient {
  private config;

  private provider;

  constructor(provider: 'google' | 'naver' | 'kakao') {
    this.provider = provider;
    this.config = oAuthConfig[provider];
  }

  public redirectToAuthorizaionPage(ctx: Context, state: string): void {
    let authorizationUri = `${this.config.authorizationUri}?client_id=${this.config.clientId}&response_type=code&redirect_uri=${this.config.callbackUri}&state=${state}`;
    if (this.provider === 'google') {
      authorizationUri +=
        '&scope=openid%20email%20profile&access_type=online&include_granted_scopes=true';
    }
    ctx.redirect(authorizationUri);
  }

  public async getAccessToken(code: string, state: string): Promise<string> {
    const { tokenUri, callbackUri, clientId, clientSecret } = this.config;
    const queryParams = {
      grant_type: 'authorization_code',
      code,
      state,
      redirect_uri: callbackUri,
      client_id: clientId,
      client_secret: clientSecret,
    };
    const query = qs.stringify(queryParams);

    const response = await axios.post(tokenUri, query, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        charset: 'utf-8',
      },
    });
    return response.data.access_token;
  }

  public async getUserInfo(accessToken: string): Promise<SocialUserDTO> {
    const { userInfoUri } = this.config;
    const { data } = await axios.get(userInfoUri, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (this.provider === 'google') {
      return new GoogleUserDTO(data);
    }
    if (this.provider === 'naver') {
      return new NaverUserDTO(data);
    }
    return new KakaoUserDTO(data);
  }
}
