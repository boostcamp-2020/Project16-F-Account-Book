type Props = {
  name: string;
  socialId: string;
  socialType: string;
  profileImage?: string;
  email?: string;
};

export default class SocialUserInfo {
  name: string;

  socialId: string;

  socialType: string;

  profileImage?: string;

  email?: string;

  constructor({ name, email, socialId, socialType, profileImage }: Props) {
    this.name = name;
    this.socialId = socialId;
    this.socialType = socialType;
    this.profileImage = profileImage;
    this.email = email;
  }
}
