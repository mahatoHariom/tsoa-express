/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from 'inversify';
import { Body, Controller, Middlewares, Path, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';

import { validateRequestBody } from '../../middlewares/validate-request-body';
import { provideSingleton } from '../../../infrastructure/ioc/provide-singleton';
import { UserService } from '../../services/users/users-services';
import { ErrorResponsePayload } from '../../../../shared/common/responses/error-response-payload';
import { CreateUserDto } from '../../dtos/auth/auth-dto';


@Tags('/user')
@Route('/{teamId}/user')
@provideSingleton(UserController)
export class UserController extends Controller {
  constructor(@inject(UserService) private readonly userService: UserService) {
    super();
  }

  /**
   * @summary 회원가입
   */
  @Post('/')
  @SuccessResponse(201, 'Created')
  @Response<ErrorResponsePayload>('400', 'BadRequest')
  @Response<ErrorResponsePayload>('409', 'ConflictException')
  @Middlewares(validateRequestBody(CreateUserDto))
  async create(@Path('teamId') teamId: string, @Body() body: CreateUserDto) {
    const user = await this.userService.create({ ...body });
    return user;
  }
}
