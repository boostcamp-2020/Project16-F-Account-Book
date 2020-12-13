import Router from 'koa-router';
import { Context } from 'koa';
import userRepository from '@/domain/user/user.repository';
import { v4 } from 'uuid';
import { JwtConfig } from '@/config/index';
import UserService from '@/domain/user/user.service';
import jwtAuthorize from '@/middleware/jwt-authorize';
import OAuthClient from '@/lib/oauth-client';
import BadRequest from '@/common/error/bad-request';
import JwtUtils from './utils/jwt-utils';

class AuthRouter extends Router {
  private userService;

  constructor() {
    super();
    this.userService = new UserService(userRepository.getUserRepository());
  }

  initRouter(): void {
    this.get('/isLogin', jwtAuthorize, (ctx: Context) => {
      const { createAt } = ctx.state.user;
      ctx.body = createAt;
    });
    this.post('/logout', jwtAuthorize, (ctx: Context) => {
      ctx.cookies.set('jwt');
      ctx.status = 204;
    });

    this.get('/:provider', (ctx: Context) => {
      const { provider } = ctx.params;
      const oAuthClient = new OAuthClient(provider);
      const state = v4();
      oAuthClient.authenticate(ctx, state);
    });

    this.get('/callback/:provider', async (ctx: Context) => {
      const { provider } = ctx.params;
      const { code, state, error } = ctx.request.query;
      if (error || !code) throw new BadRequest('Bad request');

      const oAuthClient = new OAuthClient(provider);
      const { profile } = await oAuthClient.authorize(code, state);

      const uid = await this.userService.getOrCreateUid(profile);
      const jwtToken = JwtUtils.generateToken(uid);

      ctx.cookies.set('jwt', jwtToken, {
        maxAge: JwtConfig.cookieExpiresIn,
        httpOnly: true,
      });

      const clientUri = process.env.CLIENT_URI as string;
      ctx.redirect(clientUri);
    });
  }
}

export default AuthRouter;
