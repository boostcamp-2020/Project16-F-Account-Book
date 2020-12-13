import jwt from 'jsonwebtoken';
import { Context } from 'koa';
import decodedJWT from '@/domain/auth/types/decoded-jwt';
import UserDTO from '@/domain/auth/types/user-dto';

export default class JwtUtils {
  private config;

  constructor(config: { tokenSecret: string; tokenExpiresIn: number; refreshThreshold: number }) {
    this.config = config;
  }

  generateToken = ({ uid, socialId, socialType }: UserDTO): string => {
    const token = jwt.sign(
      {
        uid,
        socialId,
        socialType,
      },
      this.config.tokenSecret,
      {
        expiresIn: this.config.tokenExpiresIn,
      },
    );
    return token;
  };

  verifyToken = (token: string): decodedJWT => {
    const decodedToken = jwt.verify(token, this.config.tokenSecret) as decodedJWT;
    return decodedToken;
  };

  setCookie = (ctx: Context, token: string): void => {
    ctx.cookies.set('jwt', token, {
      maxAge: this.config.tokenExpiresIn * 1000,
      httpOnly: true,
    });
  };
}
