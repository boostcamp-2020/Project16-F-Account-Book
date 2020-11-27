import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

export const ormConfig = {
  type: process.env.TYPEORM_CONNECTION || 'mysql',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: Number(process.env.TYPEORM_PORT || 3306),
  username: process.env.TYPEORM_USERNAME || 'test',
  password: process.env.TYPEORM_PASSWORD || 'test',
  database: process.env.TYPEORM_DATABASE || 'test',
  entities: [process.env.TYPEORM_ENTITIES || 'src/entity/*.entity.ts'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
};

export const oAuthConfig = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || 'clientID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'clientSecret',
    authorizationUri:
      process.env.GOOGLE_AUTHORIZATION_URI || 'https://accounts.google.com/o/oauth2/v2/auth',
    callbackUri:
      process.env.GOOGLE_CALLBACK_URI || 'http://localhost:4000/api/auth/callback/google',
    tokenUri: process.env.GOOGLE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
    userInfoUri:
      process.env.GOOGLE_USERINFO_URI || 'https://openidconnect.googleapis.com/v1/userinfo',
  },
  naver: {
    clientId: process.env.NAVER_CLIENT_ID || 'clientID',
    clientSecret: process.env.NAVER_CLIENT_SECRET || 'clientSecret',
    authorizationUri:
      process.env.NAVER_AUTHORIZATION_URI || 'https://nid.naver.com/oauth2.0/authorize',
    callbackUri: process.env.NAVER_CALLBACK_URI || 'http://localhost:4000/api/auth/callback/naver',
    tokenUri: process.env.NAVER_TOKEN_URI || 'https://nid.naver.com/oauth2.0/token',
    userInfoUri: process.env.NAVER_USERINFO_URI || 'https://openapi.naver.com/v1/nid/me',
  },
  kakao: {
    clientId: process.env.KAKAO_CLIENT_ID || 'clientID',
    clientSecret: process.env.KAKAO_CLIENT_SECRET || 'clientSecret',
    authorizationUri:
      process.env.KAKAO_AUTHORIZATION_URI || 'https://kauth.kakao.com/oauth/authorize',
    callbackUri: process.env.KAKAO_CALLBACK_URI || 'http://localhost:4000/api/auth/callback/kakao',
    tokenUri: process.env.KAKAO_TOKEN_URI || 'https://kauth.kakao.com/oauth/token',
    userInfoUri: process.env.KAKAO_USERINFO_URI || 'https://kapi.kakao.com/v2/user/me',
  },
};
