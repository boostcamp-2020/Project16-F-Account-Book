import { ACCESS_DENIED } from 'common/error';
import Router from 'koa-router';
import { Context } from 'koa';
import AuthService from './auth.service';
import KaKaoUserDTO from './types/kakao-user-dto';
import UserService from '../user/user.service';
import NaverUserDTO from './types/naver-user-dto';
import GoogleUserDTO from './types/google-user-dto';
import jwtAuthorize from '../middleware/jwt-authorize';

const AuthRouter = new Router();

AuthRouter.get('/', (ctx: Context) => {
  ctx.body = '리다이렉트됨';
});

AuthRouter.get('/isLogin', jwtAuthorize, (ctx: Context) => {
  ctx.body = {
    isLogin: 'true',
  };
});

AuthRouter.get('/callback/naver/redirect', async (ctx: Context) => {
  const { code, error } = ctx.request.query;
  if (error || !code) throw new Error(ACCESS_DENIED);

  const accessToken = await AuthService.getNaverAccessToken(code);
  const userInfo = await AuthService.getNaverUserInfo(accessToken);
  const userData = new NaverUserDTO(userInfo);

  const uid = await UserService.getUid(userData);

  const jwtToken = AuthService.generateToken(uid);
  ctx.cookies.set('jwt', jwtToken, {
    maxAge: Number(process.env.TOKEN_EXP),
    httpOnly: true,
  });
  ctx.redirect('http://localhost:4000/api/auth');
});

AuthRouter.get('/callback/kakao', async (ctx: Context) => {
  const { code, error } = ctx.request.query;
  if (error || !code) throw new Error(ACCESS_DENIED);

  const accessToken = await AuthService.getKakaoAccessToken(code);
  const userInfo = await AuthService.getKakaoUserInfo(accessToken);
  const userData = new KaKaoUserDTO(userInfo);

  const uid = await UserService.getUid(userData);

  const jwtToken = AuthService.generateToken(uid);
  ctx.cookies.set('jwt', jwtToken, {
    maxAge: Number(process.env.TOKEN_EXP),
    httpOnly: true,
  });
  ctx.redirect('http://localhost:4000/api/auth');
});

AuthRouter.get('/callback/google', async (ctx: Context) => {
  const { code, error } = ctx.request.query;
  if (error || !code) throw new Error(ACCESS_DENIED);

  const accessToken = await AuthService.getGoogleAccessToken(code);
  const userInfo = await AuthService.getGoogleUserInfo(accessToken);
  const userData = new GoogleUserDTO(userInfo);

  const uid = await UserService.getUid(userData);

  const jwtToken = AuthService.generateToken(uid);
  ctx.cookies.set('jwt', jwtToken, {
    maxAge: Number(process.env.TOKEN_EXP),
    httpOnly: true,
  });
  ctx.redirect('http://localhost:4000/api/auth');
});

export default AuthRouter;
