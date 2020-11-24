import Axios from 'axios';
import * as qs from 'querystring';
import { Next } from 'koa';
import { Context } from 'vm';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import UserEntity from 'entity/user.entity';
import KakaoUserInfo from './types/kakao-user-info';
import decodedJWT from './types/decoded-jwt';
import UserDTO from './types/user-dto';

const getKakaoAccessToken = async (code: string): Promise<string> => {
  const response = await Axios.post(
    'https://kauth.kakao.com/oauth/token',
    qs.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
    }),
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        charset: 'utf-8',
      },
    },
  );
  return response.data.access_token;
};

const getKakaoUserInfo = async (accessToken: string): Promise<KakaoUserInfo> => {
  const { data } = await Axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
};

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

export { generateToken, jwtMiddleware, getKakaoAccessToken, getKakaoUserInfo };
