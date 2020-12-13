import { Context, Next } from 'koa';
import { JwtConfig } from '@/config';
import JwtUtils from '@/lib/jwt-utils';
import UserRepository from '@/domain/user/user.repository';
import UserDTO from '@/domain/user/types/user-dto';
import UnauthorizedError from '@/common/error/unauthorized';

const jwtAuthorize = async (ctx: Context, next: Next): Promise<void> => {
  const jwtUtils = new JwtUtils(JwtConfig);
  const token = ctx.cookies.get('jwt');
  if (!token) {
    throw new UnauthorizedError('Request need authorization');
  }
  try {
    const { uid, socialId, socialType, exp } = jwtUtils.verifyToken(token);
    const userRepository = UserRepository.getUserRepository();
    const user = await userRepository.findOne({ where: { uid, socialId, socialType } });
    if (!user) throw new Error('Not found user');

    const userDTO = new UserDTO(user);
    ctx.state.user = userDTO;

    const nowToSec: number = new Date().getTime() / 1000;
    if (exp - nowToSec < JwtConfig.refreshThreshold) {
      const newToken = jwtUtils.generateToken(userDTO);
      jwtUtils.setCookie(ctx, newToken);
    }
  } catch (e) {
    throw new UnauthorizedError('Invalid authentication token');
  }
  await next();
};

export default jwtAuthorize;
