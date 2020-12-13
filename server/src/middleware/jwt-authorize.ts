import { Context, Next } from 'koa';
import { getRepository } from 'typeorm';
import { JwtConfig } from '@/config';
import JwtUtils from '@/domain/auth/utils/jwt-utils';
import UserEntity from '@/entity/user.entity';
import UserDTO from '@/domain/auth/types/user-dto';
import UnauthorizedError from '@/common/error/unauthorized';

const jwtAuthorize = async (ctx: Context, next: Next): Promise<void> => {
  const token = ctx.cookies.get('jwt');
  if (!token) {
    throw new UnauthorizedError('Request need authorization');
  }
  try {
    const decoded = JwtUtils.verifyToken(token);
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { uid: decoded.uid } });
    if (!user) throw new Error('Not found user');

    const userDTO = new UserDTO(user);
    ctx.state.user = userDTO;

    const now: number = new Date().getTime();

    if (decoded.exp - now < JwtConfig.refreshThreshold) {
      const newToken = JwtUtils.generateToken(userDTO);
      JwtUtils.setCookie(ctx, newToken);
    }
  } catch (e) {
    throw new UnauthorizedError('Invalid authentication token');
  }
  await next();
};

export default jwtAuthorize;
