import { ACCESS_DENIED } from 'common/error';
import Router from 'koa-router';
import { Context } from 'koa';
import { v4 } from 'uuid';
import { JwtConfig } from '@config/index';
import UserService from '../user/user.service';
import jwtAuthorize from '../middleware/jwt-authorize';
import OAuthClient from './oauth-client';
import JwtUtils from './utils/jwt-utils';

const AuthRouter = new Router();

AuthRouter.get('/isLogin', jwtAuthorize, (ctx: Context) => {
  ctx.status = 200;
});

AuthRouter.get('/:provider', (ctx: Context) => {
  const { provider } = ctx.params;
  const oAuthClient = new OAuthClient(provider);
  const state = v4();
  oAuthClient.redirectToAuthorizaionPage(ctx, state);
});

AuthRouter.get('/callback/:provider', async (ctx: Context) => {
  const { provider } = ctx.params;
  const { code, state, error } = ctx.request.query;
  if (error || !code) throw new Error(ACCESS_DENIED);

  const oAuthClient = new OAuthClient(provider);
  const accessToken = await oAuthClient.getAccessToken(code, state);
  const userInfo = await oAuthClient.getUserInfo(accessToken);

  const uid = await UserService.getOrCreateUid(userInfo);
  const jwtToken = JwtUtils.generateToken(uid);

  ctx.cookies.set('jwt', jwtToken, {
    maxAge: JwtConfig.cookieExpiredAt,
    httpOnly: true,
  });

  const clientUri = process.env.CLIENT_URI as string;
  ctx.redirect(clientUri);
});

export default AuthRouter;
