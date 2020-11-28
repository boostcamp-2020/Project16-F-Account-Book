import jwt from 'jsonwebtoken';
import { JwtConfig } from '@config/index';
import decodedJWT from '@/domain/auth/types/decoded-jwt';

const generateToken = (uid: number): string => {
  const token = jwt.sign(
    {
      uid,
    },
    JwtConfig.tokenSecret,
    {
      expiresIn: JwtConfig.tokenExpiresIn,
    },
  );
  return token;
};

const verifyToken = (token: string): decodedJWT => {
  const decodedToken = jwt.verify(token, JwtConfig.tokenSecret) as decodedJWT;
  return decodedToken;
};

export default { generateToken, verifyToken };
