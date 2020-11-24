import { ACCESS_DENIED } from 'common/error';
import Router from 'koa-router';
import { Context } from 'koa';
import * as AuthService from './auth.service';
import KakaoUserInfo from './types/kakao-user-info';
import UserService from '../user/user.service';

const AuthRouter = new Router();

AuthRouter.get('/callback', async (ctx: Context) => {
  const { code, error } = ctx.request.query;
  if (error || !code) throw new Error(ACCESS_DENIED);

  const accessToken = await AuthService.getKakaoAccessToken(code);
  const userData: KakaoUserInfo = await AuthService.getKakaoUserInfo(accessToken);
  const isExistUser = await UserService.isExitSocialUser(userData.id, userData.type);
  if (!isExistUser) {
    const newUser = await UserService.createNewUser(userData);
  }
  const user = await UserService.getUserBySocialId(userData.id, userData.type);
});

export default AuthRouter;
