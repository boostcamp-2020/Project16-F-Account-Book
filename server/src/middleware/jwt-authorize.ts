import { Context, Next } from 'koa';
import { getRepository } from 'typeorm';
import JwtUtils from '@/domain/auth/utils/jwt-utils';
import { JwtConfig } from '@config/index';
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
    ctx.state.user = new UserDTO(user);
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 4) {
      const newToken = JwtUtils.generateToken(decoded.uid);
      ctx.cookies.set('jwt', newToken, {
        maxAge: Number(JwtConfig.cookieExpiresIn),
        httpOnly: true,
      });
    }
  } catch (e) {
    throw new UnauthorizedError('Invalid authorization token');
  }
  await next();
};

export default jwtAuthorize;
