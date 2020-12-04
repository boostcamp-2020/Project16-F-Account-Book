import SocialUserInfo from './default';

export default class GoogleUserInfo extends SocialUserInfo {
  constructor(userInfo: any) {
    super({
      name: userInfo.name,
      email: userInfo.email,
      profileImage: userInfo.picture,
      socialId: userInfo.sub,
      socialType: 'google',
    });
  }
}
