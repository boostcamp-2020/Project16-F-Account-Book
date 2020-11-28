import { Next } from 'koa';
import { Context } from 'vm';
import { getRepository } from 'typeorm';
import JwtUtils from '@auth/utils/jwt-utils';
import { JwtConfig } from '@config/index';
import UserEntity from '../entity/user.entity';
import UserDTO from '../auth/types/user-dto';

const jwtAuthorize = async (ctx: Context, next: Next): Promise<void> => {
  const token = ctx.cookies.get('jwt');
  if (!token) {
    throw new Error('unauthorized');
  }

  try {
    const decoded = JwtUtils.verifyToken(token);
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { uid: decoded.uid } });

    if (!user) throw new Error('no user');

    ctx.state.user = new UserDTO(user);

    const now: number = Math.floor(Date.now() / 1000);

    if (decoded.exp - now < 60 * 60 * 4) {
      const newToken = JwtUtils.generateToken(decoded.uid);
      ctx.cookies.set('jwt', newToken, {
        maxAge: Number(JwtConfig.cookieExpiresIn),
        httpOnly: true,
      });
    }

    await next();
  } catch (e) {
    throw new Error(e.message);
  }
};

export default jwtAuthorize;
