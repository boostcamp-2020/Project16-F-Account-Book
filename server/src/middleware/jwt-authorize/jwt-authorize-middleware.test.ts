import { createMockContext } from '@shopify/jest-koa-mocks';
import JwtUtils from '@/lib/jwt-utils';
import UserRepository from '@/domain/user/user.repository';
import UserDTO from '@/domain/auth/types/user-dto';
import UnauthorizedError from '@/common/error/unauthorized';
import { fail } from 'assert';
import JwtAuthorizeMiddleware from '.';

describe('Jwt Authorize Middleware', () => {
  it('토큰이 유효하면 context.state에 user가 등록된다', async () => {
    const userRepository = UserRepository.getUserRepository();
    const user = await userRepository.save({
      socialId: '123456789',
      socialType: 'naver',
      name: 'TestUser',
    });
    const userDTO = new UserDTO(user);
    const token = JwtUtils.generateToken(userDTO);
    const cookies = { jwt: token };
    const ctx = createMockContext({ cookies });

    await JwtAuthorizeMiddleware(ctx, () => Promise.resolve());

    expect(ctx.state.user).toStrictEqual(userDTO);

    await userRepository.remove(user);
  });

  it('등록된 유저가 아니면 UnauthorizedError가 던져진다', async () => {
    const userDTO = new UserDTO({
      uid: 1,
      socialId: '123456789',
      socialType: 'naver',
      name: 'TestUser',
      updateAt: undefined,
      createAt: new Date(),
    });
    const token = JwtUtils.generateToken(userDTO);
    const cookies = { jwt: token };
    const ctx = createMockContext({ cookies });

    try {
      await JwtAuthorizeMiddleware(ctx, () => Promise.resolve());
      fail();
    } catch (err) {
      expect(err.constructor).toEqual(UnauthorizedError);
    }
  });
});
