import { inject } from 'inversify';
import { Prisma, User } from '@prisma/client';
import { provideSingleton } from '../../../infrastructure/ioc/provide-singleton';
import { UserRepository } from '../../../domain/repositories/users/users-repositories';
import { ConflictException } from '../../../../shared/common/exceptions/conflict-exception';
import { NotFoundUserException } from '../../exceptions/users/user-exception';
import { createHashedPassword } from '../../../../shared/utils/create-hashed-password';
import { BadRequestException } from '../../../../shared/common/exceptions/bad-request-exception';


@provideSingleton(UserService)
export class UserService {
  constructor(@inject(UserRepository) private readonly userRepository: UserRepository) {}

  async create(data: Prisma.UserCreateInput) {
    const user = await this.getByEmail(data.email).catch((e: NotFoundUserException) => {
      if (e instanceof NotFoundUserException) return null;
      throw e;
    });

    if (user) {
      throw new ConflictException('User with email already exist');
    }

    const hashedPassword = createHashedPassword(data.password);
    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return newUser;
  }

  async validate(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new NotFoundUserException();
    }
    const hashedPassword = createHashedPassword(password);
    if (user.password !== hashedPassword) {
      throw new BadRequestException('Password is incorrect');
    }
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundUserException();
    }
    return user;
  }

  async getById(id: number) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundUserException();
    }
    return user;
  }
}
