import { Context, Next } from 'koa';
import { getRepository } from 'typeorm';
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
    if (!user) throw new Error('no user');

    const userDTO = new UserDTO(user);
    ctx.state.user = userDTO;

    const now: number = new Date().getTime();
    const FOUR_HOUR = 1000 * 60 * 60 * 4;

    if (decoded.exp - now < FOUR_HOUR) {
      const newToken = JwtUtils.generateToken(userDTO);
      JwtUtils.setCookie(ctx, newToken);
    }
  } catch (e) {
    throw new UnauthorizedError('Invalid authentication token');
  }
  await next();
};

export default jwtAuthorize;
