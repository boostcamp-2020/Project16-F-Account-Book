import { ACCESS_DENIED } from 'common/error';
import Router from 'koa-router';
import { Context } from 'koa';
import userRepository from '@/user/user.repository';
import AuthService from './auth.service';
import KaKaoUserDTO from './types/kakao-user-dto';
import UserService from '../user/user.service';
import NaverUserDTO from './types/naver-user-dto';
import GoogleUserDTO from './types/google-user-dto';
import jwtAuthorize from '../middleware/jwt-authorize';

class AuthRouter extends Router {
  userService;

  constructor() {
    super();
    this.userService = new UserService(userRepository.getUserRepository());
  }

  initRouter(): void {
    this.get('/isLogin', jwtAuthorize, (ctx: Context) => {
      ctx.status = 200;
    });

    this.get('/:provider', (ctx: Context) => {
      const { provider } = ctx.params;
      let uri = '';

      if (provider === 'google') {
        uri = process.env.GOOGLE_URI as string;
      } else if (provider === 'naver') {
        uri = process.env.NAVER_URI as string;
      } else if (provider === 'kakao') {
        uri = process.env.KAKAO_URI as string;
      }

      ctx.redirect(uri);
    });

    this.get('/callback/naver/redirect', async (ctx: Context) => {
      const { code, error } = ctx.request.query;
      if (error || !code) throw new Error(ACCESS_DENIED);

      const accessToken = await AuthService.getNaverAccessToken(code);
      const userInfo = await AuthService.getNaverUserInfo(accessToken);
      const userData = new NaverUserDTO(userInfo);

      const uid = await this.userService.getOrCreateUid(userData);

      const jwtToken = AuthService.generateToken(uid);
      ctx.cookies.set('jwt', jwtToken, {
        maxAge: Number(process.env.TOKEN_EXP),
        httpOnly: true,
      });
      const clientUri = process.env.CLIENT_URI as string;
      ctx.redirect(clientUri);
    });

    this.get('/callback/kakao', async (ctx: Context) => {
      const { code, error } = ctx.request.query;
      if (error || !code) throw new Error(ACCESS_DENIED);

      const accessToken = await AuthService.getKakaoAccessToken(code);
      const userInfo = await AuthService.getKakaoUserInfo(accessToken);
      const userData = new KaKaoUserDTO(userInfo);

      const uid = await this.userService.getOrCreateUid(userData);

      const jwtToken = AuthService.generateToken(uid);
      ctx.cookies.set('jwt', jwtToken, {
        maxAge: Number(process.env.TOKEN_EXP),
        httpOnly: true,
      });
      const clientUri = process.env.CLIENT_URI as string;
      ctx.redirect(clientUri);
    });

    this.get('/callback/google', async (ctx: Context) => {
      const { code, error } = ctx.request.query;
      if (error || !code) throw new Error(ACCESS_DENIED);

      const accessToken = await AuthService.getGoogleAccessToken(code);
      const userInfo = await AuthService.getGoogleUserInfo(accessToken);
      const userData = new GoogleUserDTO(userInfo);

      const uid = await this.userService.getOrCreateUid(userData);
      console.log(userInfo);
      const jwtToken = AuthService.generateToken(uid);
      ctx.cookies.set('jwt', jwtToken, {
        maxAge: Number(process.env.TOKEN_EXP),
        httpOnly: true,
      });
      const clientUri = process.env.CLIENT_URI as string;
      ctx.redirect(clientUri);
    });
  }
}

export default AuthRouter;
