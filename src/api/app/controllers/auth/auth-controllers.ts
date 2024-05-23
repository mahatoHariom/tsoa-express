import { Body, Controller, Middlewares, Post, Request, Route, Security, Tags,} from 'tsoa';
import { validateRequestBody } from '../../middlewares/validate-request-body';
import { AuthServices } from '../../services/auth/auth-services';
import { provideSingleton } from '../../../infrastructure/ioc/provide-singleton';
import { CreateUserDto, LoginBodyDto, RefreshTokenDto } from '../../dtos/auth/auth-dto';
import { TokenResponse, UserEntity } from '../../../domain/entities/auth/auth-entitites';
import { sendResponse } from '../../../../shared/common/responses/responseWrapper';
import { Request as ExpressRequest } from 'express';
import { UnAuthorizedException } from '../../../../shared/common/exceptions/unauthorized-exception';

@Tags('Auth')
@Route('/auth')
@provideSingleton(AuthControllers)
export class AuthControllers extends Controller {
  constructor(private readonly authService: AuthServices) {
    super();
  }
  
  @Post('/register')
  @Middlewares(validateRequestBody(CreateUserDto))
  async createUser(@Body() body: CreateUserDto): Promise<UserEntity> {
    const user = await this.authService.register(body);
    return sendResponse<UserEntity>(user, UserEntity);
  }

  @Post('/login')
  @Middlewares(validateRequestBody(LoginBodyDto))
  async loginUser(@Body() body: LoginBodyDto): Promise<TokenResponse> {
    return await this.authService.login(body);
  }

  @Post('/refresh')
  @Security('jwt')
  @Middlewares(validateRequestBody(RefreshTokenDto))
  async refreshToken(@Body() body: RefreshTokenDto, @Request() req: ExpressRequest): Promise<TokenResponse> 
  {
    if (!req.user) {
      throw new UnAuthorizedException();
    }
    return await this.authService.refresh(body.refreshToken, req.user);
  }
}
