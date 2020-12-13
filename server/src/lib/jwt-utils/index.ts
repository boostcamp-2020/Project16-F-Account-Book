import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { JwtConfig } from '@/config/index';
import decodedJWT from '@/domain/auth/types/decoded-jwt';
import UserDTO from '@/domain/auth/types/user-dto';

const generateToken = ({ uid, socialId, socialType }: UserDTO): string => {
  const token = jwt.sign(
    {
      uid,
      socialId,
      socialType,
    },
    JwtConfig.tokenSecret,
    {
      expiresIn: JwtConfig.tokenExpiresIn,
    },
  );
  return token;
};

const verifyToken = (token: string): decodedJWT => {
  const decodedToken = jwt.verify(token, JwtConfig.tokenSecret) as decodedJWT;
  return decodedToken;
};

const setCookie = (ctx: Context, token: string): void => {
  ctx.cookies.set('jwt', token, {
    maxAge: Number(JwtConfig.cookieExpiresIn),
    httpOnly: true,
  });
};

export default { generateToken, verifyToken, setCookie };
