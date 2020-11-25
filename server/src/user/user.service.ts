import SocialUserDTO from '@/auth/types/social-user-dto';
import UserEntity from 'entity/user.entity';
import { getRepository } from 'typeorm';

const UserService = {
  getUserById: async (id: number): Promise<UserEntity | undefined> => {
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { uid: id } });

    return user;
  },

  getUid: async (data: SocialUserDTO): Promise<number | undefined> => {
    const userRepository = getRepository(UserEntity);
    const user = await await userRepository.findOne({
      where: { socialId: data.socialId, socialType: data.socialType },
    });

    return user?.uid;
  },

  createNewUser: async (data: SocialUserDTO): Promise<number> => {
    const userRepository = getRepository(UserEntity);
    const newUser = userRepository.create({
      name: data.name,
      socialId: data.socialId,
      socialType: data.socialType,
    });
    const savedUser = await userRepository.save(newUser);

    return savedUser.uid;
  },
};

export default UserService;
