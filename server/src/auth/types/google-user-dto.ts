/* eslint-disable camelcase */
import SocialUserDTO from './social-user-dto';

export interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: string;
  locale: string;
}

export default class GoogleUserDTO implements SocialUserDTO {
  constructor(userInfo: GoogleUserInfo) {
    this.name = userInfo.name;
    this.socialId = userInfo.email;
    this.socialType = 'google';
  }

  name: string;

  socialId: string;

  socialType: string;
}
