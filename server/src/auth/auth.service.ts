import Axios from 'axios';
import * as qs from 'querystring';
import { Next } from 'koa';
import { Context } from 'vm';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import UserEntity from 'entity/user.entity';
import { KakaoUserInfo } from './types/kakao-user-dto';
import decodedJWT from './types/decoded-jwt';
import UserDTO from './types/user-dto';
import { NaverUserInfo } from './types/naver-user-dto';
import { GoogleUserInfo } from './types/google-user-dto';

const AuthService = {
  getNaverAccessToken: async (code: string): Promise<string> => {
    const response = await Axios.post(
      'https://nid.naver.com/oauth2.0/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code,
        client_id: process.env.NAVER_CLIENT_ID,
        client_secret: process.env.NAVER_CLIENT_SECRET,
        state: 'hLiDdL2uhPtsftcU',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
      },
    );
    return response.data.access_token;
  },

  getNaverUserInfo: async (accessToken: string): Promise<NaverUserInfo> => {
    const { data } = await Axios.get('	https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.response;
  },

  getKakaoAccessToken: async (code: string): Promise<string> => {
    const response = await Axios.post(
      'https://kauth.kakao.com/oauth/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
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
  },

  getKakaoUserInfo: async (accessToken: string): Promise<KakaoUserInfo> => {
    const { data } = await Axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  },

  getGoogleAccessToken: async (code: string): Promise<string> => {
    const response = await Axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          charset: 'utf-8',
        },
      },
    );

    return response.data.access_token;
  },

  getGoogleUserInfo: async (accessToken: string): Promise<GoogleUserInfo> => {
    const { data } = await Axios.get('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  },

  generateToken: (uid: number) => {
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
  },

  jwtMiddleware: async (ctx: Context, next: Next) => {
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
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
      }

      next();
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

export default AuthService;
