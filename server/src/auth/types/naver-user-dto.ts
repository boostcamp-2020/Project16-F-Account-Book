import SocialUserDTO from './social-user-dto';

export interface NaverUserInfo {
  resultcode: string;
  message: string;
  response: {
    id: string;
    name: string;
    email: string;
  };
}

export default class NaverUserDTO implements SocialUserDTO {
  constructor(data: NaverUserInfo) {
    this.socialId = data.response.id;
    this.name = data.response.name;
    this.socialType = 'naver';
  }

  socialId: string;

  name: string;

  socialType: string;
}
