import { createMockContext } from '@shopify/jest-koa-mocks';
import JwtUtils from '@/lib/jwt-utils';
import UserRepository from '@/domain/user/user.repository';
import UserDTO from '@/domain/user/types/user-dto';
import UnauthorizedError from '@/common/error/unauthorized';
import { fail } from 'assert';
import { JwtConfig } from '@/config';
import JwtAuthorizeMiddleware from '.';

describe('Jwt Authorize Middleware', () => {
  it('토큰이 유효하면 context.state에 user가 등록된다', async () => {
    const jwtUtils = new JwtUtils(JwtConfig);
    const userRepository = UserRepository.getUserRepository();
    const user = await userRepository.save({
      socialId: '123456789',
      socialType: 'naver',
      name: 'TestUser',
    });
    const userDTO = new UserDTO(user);
    const token = jwtUtils.generateToken(userDTO);
    const cookies = { jwt: token };
    const ctx = createMockContext({ cookies });

    await JwtAuthorizeMiddleware(ctx, () => Promise.resolve());

    expect(ctx.state.user).toStrictEqual(userDTO);

    await userRepository.remove(user);
  });

  it('등록된 유저가 아니면 UnauthorizedError가 던져진다', async () => {
    const jwtUtils = new JwtUtils(JwtConfig);
    const userDTO = new UserDTO({
      uid: 1,
      socialId: '123456789',
      socialType: 'naver',
      name: 'TestUser',
      updateAt: undefined,
      createAt: new Date(),
    });
    const token = jwtUtils.generateToken(userDTO);
    const cookies = { jwt: token };
    const ctx = createMockContext({ cookies });

    try {
      await JwtAuthorizeMiddleware(ctx, () => Promise.resolve());
      fail();
    } catch (err) {
      expect(err.constructor).toEqual(UnauthorizedError);
    }
  });

  it('토큰이 만료된 경우 UnauthorizedError가 던져진다', async () => {
    const jwtUtils = new JwtUtils({ ...JwtConfig, tokenExpiresIn: 0 });
    const userRepository = UserRepository.getUserRepository();
    const user = await userRepository.save({
      socialId: '123456789',
      socialType: 'naver',
      name: 'TestUser',
    });
    const userDTO = new UserDTO(user);
    const token = jwtUtils.generateToken(userDTO);
    const cookies = { jwt: token };
    const ctx = createMockContext({ cookies });

    try {
      await JwtAuthorizeMiddleware(ctx, () => Promise.resolve());
      fail();
    } catch (err) {
      expect(err.constructor).toEqual(UnauthorizedError);
    }

    await userRepository.remove(user);
  });

  it('동일한 uid이지만 socialId, socialType이 다르면 UnauthorizedError가 던져진다 (DB 변경에 대한 오류상황 케이스)', async () => {
    const jwtUtils = new JwtUtils(JwtConfig);
    const userRepository = UserRepository.getUserRepository();
    const user = await userRepository.save({
      socialId: '123456789',
      socialType: 'naver',
      name: 'TestUser',
    });

    const token = jwtUtils.generateToken({ ...user, socialId: '987654321', socialType: 'google' });
    const cookies = { jwt: token };
    const ctx = createMockContext({ cookies });

    try {
      await JwtAuthorizeMiddleware(ctx, () => Promise.resolve());
      fail();
    } catch (err) {
      expect(err.constructor).toEqual(UnauthorizedError);
    }

    await userRepository.remove(user);
  });

  it('토큰의 유효시간이 threshold 미만으로 남은 경우 재발급 된다', async () => {
    // default threshold = 4hour
    const HOUR = 3600;
    const jwtUtils = new JwtUtils({ ...JwtConfig, tokenExpiresIn: HOUR });
    const userRepository = UserRepository.getUserRepository();
    const user = await userRepository.save({
      socialId: '123456789',
      socialType: 'naver',
      name: 'TestUser',
    });
    const userDTO = new UserDTO(user);
    const token = jwtUtils.generateToken(userDTO);
    const cookies = { jwt: token };
    const ctx = createMockContext({ cookies });

    await JwtAuthorizeMiddleware(ctx, () => Promise.resolve());
    expect(ctx.cookies.set).toBeCalledTimes(1);

    await userRepository.remove(user);
  });

  it('토큰의 유효시간이 threshold 이상으로 남은 경우 재발급 되지 않는다', async () => {
    // default threshold = 4hour
    const HOUR = 3600;
    const jwtUtils = new JwtUtils({ ...JwtConfig, tokenExpiresIn: 5 * HOUR });
    const userRepository = UserRepository.getUserRepository();
    const user = await userRepository.save({
      socialId: '123456789',
      socialType: 'naver',
      name: 'TestUser',
    });
    const userDTO = new UserDTO(user);
    const token = jwtUtils.generateToken(userDTO);
    const cookies = { jwt: token };
    const ctx = createMockContext({ cookies });

    await JwtAuthorizeMiddleware(ctx, () => Promise.resolve());
    expect(ctx.cookies.set).toBeCalledTimes(0);

    await userRepository.remove(user);
  });
});
