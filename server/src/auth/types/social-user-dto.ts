import User from 'common/types/user';
import KakaoUserInfo from './kakao-user-info';

export default class SocialUserDTO implements User {
  constructor(userInfo: KakaoUserInfo) {
    this.name = userInfo.properties.nickname;
    this.socialId = userInfo.id;
    this.socialType = userInfo.type;
  }

  name: string;

  socialId: string;

  socialType: string;
}
