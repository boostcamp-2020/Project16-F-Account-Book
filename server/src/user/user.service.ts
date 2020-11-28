import SocialUserDTO from '@/auth/types/social-user-dto';
import UserEntity from 'entity/user.entity';
import { Repository } from 'typeorm';

export default class UserService {
  private userRepository: Repository<UserEntity>;

  constructor(userRepository: Repository<UserEntity>) {
    this.userRepository = userRepository;
  }

  public async getUserById(id: number): Promise<UserEntity | undefined> {
    const user = await this.userRepository.findOne({ where: { uid: id } });

    return user;
  }

  public async getOrCreateUid(data: SocialUserDTO): Promise<number> {
    let user = await this.userRepository.findOne({
      where: { socialId: data.socialId, socialType: data.socialType },
    });

    if (!user) {
      user = await this.createNewUser(data);
    }

    return user.uid;
  }

  public async createNewUser(data: SocialUserDTO): Promise<UserEntity> {
    const newUser = this.userRepository.create({
      name: data.name,
      socialId: data.socialId,
      socialType: data.socialType,
    });
    const savedUser = await this.userRepository.save(newUser);

    return savedUser;
  }
}
