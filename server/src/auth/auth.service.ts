import { Next } from 'koa';
import { Context } from 'vm';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import UserEntity from 'entity/user.entity';
import decodedJWT from './types/decodedJWT';
import UserDTO from './types/userDTO';

const generateToken = (uid: number) => {
  const token = jwt.sign(
    {
      uid,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: '1d',
    },
  );
  return token;
};

const jwtMiddleware = async (ctx: Context, next: Next) => {
  const token = ctx.cookies.get('jwt');
  if (!token) {
    ctx.status = 401;
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as decodedJWT;
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({ where: { uid: decoded.uid } });

    if (!user) throw new Error('no user');

    ctx.state.user = new UserDTO(user);

    const now: number = Math.floor(Date.now() / 1000);

    if (decoded.exp - now < 60 * 60 * 4) {
      const newToken = generateToken(decoded.uid);
      ctx.cookies.set('jwt', newToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }

    next();
  } catch (e) {
    throw new Error(e.message);
  }
};

export { generateToken, jwtMiddleware };
