import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { provideSingleton } from '../../../infrastructure/ioc/provide-singleton';
import { config } from '../../../infrastructure/env';

@provideSingleton(TokenService)
export class TokenService {
  async createJwtToken(user: User) {
    const accessToken = await jwt.sign(user, config.secret as string, { expiresIn: "1d" });
    const refreshToken = await jwt.sign(user, config.secret as string, { expiresIn:'7d'});
    return { accessToken, refreshToken };
  }
}
