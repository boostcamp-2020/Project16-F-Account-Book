import UserEntity from 'entity/user.entity';

export default class UserDTO {
  constructor(user: UserEntity) {
    this.uid = user.uid;
    this.name = user.name;
    this.socialType = user.socialType;
    this.updateAt = user.updateAt;
    this.createAt = user.createAt;
  }

  uid: number;

  name: string;

  socialType: string;

  updateAt: Date | undefined;

  createAt: Date;
}
