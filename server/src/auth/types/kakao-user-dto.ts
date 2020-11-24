import SocialUserDTO from './social-user-dto';

export interface KakaoUserInfo {
  id: string;
  properties: {
    nickname: string;
  };
}

export default class KaKaoUserDTO implements SocialUserDTO {
  constructor(userInfo: KakaoUserInfo) {
    this.name = userInfo.properties.nickname;
    this.socialId = userInfo.id;
    this.socialType = 'kakao';
  }

  name: string;

  socialId: string;

  socialType: string;
}
