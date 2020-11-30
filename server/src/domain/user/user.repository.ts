import UserEntity from '@/entity/user.entity';
import { getRepository, Repository } from 'typeorm';

const getUserRepository = (): Repository<UserEntity> => {
  return getRepository(UserEntity);
};

export default { getUserRepository };
