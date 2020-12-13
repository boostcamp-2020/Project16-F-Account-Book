import SocialUserDTO from '@/lib/oauth-client/userinfo/default';
import UserEntity from '@/entity/user.entity';
import { Repository } from 'typeorm';
import UserDTO from '../auth/types/user-dto';

export default class UserService {
  private userRepository: Repository<UserEntity>;

  constructor(userRepository: Repository<UserEntity>) {
    this.userRepository = userRepository;
  }

  public async getUserById(id: number): Promise<UserDTO | undefined> {
    const user = await this.userRepository.findOne({ where: { uid: id } });

    return user ? new UserDTO(user) : undefined;
  }

  public async getOrCreateUser(data: SocialUserDTO): Promise<UserDTO> {
    let user = await this.userRepository.findOne({
      where: { socialId: data.socialId, socialType: data.socialType },
    });

    if (!user) {
      user = await this.createNewUser(data);
    }

    return new UserDTO(user);
  }

  public async createNewUser(data: SocialUserDTO): Promise<UserDTO> {
    const newUser = this.userRepository.create({
      name: data.name,
      socialId: data.socialId,
      socialType: data.socialType,
    });
    const savedUser = await this.userRepository.save(newUser);

    return new UserDTO(savedUser);
  }
}
