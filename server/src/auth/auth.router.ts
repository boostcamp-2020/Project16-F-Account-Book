import { ACCESS_DENIED } from 'common/error';
import Router from 'koa-router';
import { Context } from 'koa';
import UserEntity from '@/entity/user.entity';
import * as AuthService from './auth.service';
import KakaoUserInfo from './types/kakao-user-info';
import UserService from '../user/user.service';

const AuthRouter = new Router();

AuthRouter.get('/', (ctx: Context) => {
  ctx.body = '리다이렉트됨';
});

AuthRouter.get('/callback/kakao', async (ctx: Context) => {
  const { code, error } = ctx.request.query;
  if (error || !code) throw new Error(ACCESS_DENIED);

  const accessToken = await AuthService.getKakaoAccessToken(code);
  const userData: KakaoUserInfo = await AuthService.getKakaoUserInfo(accessToken);
  userData.type = 'kakao';
  const isExistUser = await UserService.existSocialUser(userData.id, userData.type);

  const user = isExistUser
    ? ((await UserService.getUserBySocialId(userData.id, userData.type)) as UserEntity)
    : ((await UserService.createNewUser(userData)) as UserEntity);

  const jwtToken = AuthService.generateToken(user.uid);
  ctx.cookies.set('jwt', jwtToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  });
  ctx.redirect('http://localhost:4000/api/auth');
});

export default AuthRouter;
