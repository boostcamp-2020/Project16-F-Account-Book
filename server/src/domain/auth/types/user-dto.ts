import UserEntity from 'entity/user.entity';

export default class UserDTO {
  constructor(user: UserEntity) {
    this.uid = user.uid;
    this.name = user.name;
    this.socialType = user.socialType;
  }

  uid: number;

  name: string;

  socialType: string;
}
