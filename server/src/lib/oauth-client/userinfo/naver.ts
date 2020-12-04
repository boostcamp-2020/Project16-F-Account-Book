import SocialUserInfo from './default';

export default class NaverUserInfo extends SocialUserInfo {
  constructor(userInfo: any) {
    super({
      name: userInfo.response.name,
      email: userInfo.response.email,
      profileImage: userInfo.response.profile_image,
      socialId: userInfo.response.id,
      socialType: 'naver',
    });
  }
}
