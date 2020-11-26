import jwt from 'jsonwebtoken';
import { Next } from 'koa';
import { Context } from 'vm';
import { getRepository } from 'typeorm';
import AuthService from '../auth/auth.service';
import UserEntity from '../entity/user.entity';
import decodedJWT from './types/decoded-jwt';
import UserDTO from '../auth/types/user-dto';

const jwtAuthorize = async (ctx: Context, next: Next) => {
  const token = ctx.cookies.get('jwt');
  if (!token) {
    throw new Error('unauthorized');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as decodedJWT;
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { uid: decoded.uid } });

    if (!user) throw new Error('no user');

    ctx.state.user = new UserDTO(user);

    const now: number = Math.floor(Date.now() / 1000);

    if (decoded.exp - now < 60 * 60 * 4) {
      const newToken = AuthService.generateToken(decoded.uid);
      ctx.cookies.set('jwt', newToken, {
        maxAge: Number(process.env.TOKEN_EXP),
        httpOnly: true,
      });
    }

    await next();
  } catch (e) {
    throw new Error(e.message);
  }
};

export default jwtAuthorize;
