import { User } from '@prisma/client';
import { Expose, plainToClass } from 'class-transformer';

export class UserServiceResponseDto {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export class UserEntity {
  @Expose()
  id: number;
  @Expose()
  name: string;

  @Expose()
  email: string;

  password: string;
  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date | null;
}

export class TokenResponse {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
