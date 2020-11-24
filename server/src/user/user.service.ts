import KakaoUserInfo from 'auth/types/kakao-user-info';
import SocialUserDTO from 'auth/types/social-user-dto';
import UserEntity from 'entity/user.entity';
import { getRepository } from 'typeorm';

const UserService = {
  getUserById: async (id: number): Promise<UserEntity | undefined> => {
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { uid: id } });

    return user;
  },

  getUserBySocialId: async (
    socialId: string,
    socialType: string,
  ): Promise<UserEntity | undefined> => {
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { socialId, socialType } });

    return user;
  },

  existSocialUser: async (socialId: string, socialType: string): Promise<boolean> => {
    const user = await UserService.getUserBySocialId(socialId, socialType);

    return !!user;
  },

  createNewUser: async (data: KakaoUserInfo): Promise<UserEntity> => {
    const userRepository = getRepository(UserEntity);
    const userData = new SocialUserDTO(data);
    const newUser = userRepository.create(userData);
    const savedUser = await userRepository.save(newUser);

    return savedUser;
  },
};

export default UserService;
