import SocialUserInfo from './default';

export default class KakaoUserInfo extends SocialUserInfo {
  constructor(userInfo: any) {
    super({
      name: userInfo.properties.nickname,
      email: userInfo.kakao_account.email,
      profileImage: userInfo.properties.profile_image,
      socialId: userInfo.id,
      socialType: 'kakao',
    });
  }
}
