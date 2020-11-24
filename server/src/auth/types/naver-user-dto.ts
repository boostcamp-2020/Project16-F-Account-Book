import SocialUserDTO from './social-user-dto';

export interface NaverUserData {
  id: string;
  email: string;
  name: string;
}

export default class NaverUserDTO implements SocialUserDTO {
  constructor(data: NaverUserData) {
    this.socialId = data.id;
    this.name = data.name;
    this.socialType = 'naver';
  }

  socialId: string;

  name: string;

  socialType: string;
}
