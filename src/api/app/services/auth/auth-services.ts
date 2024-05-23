import { User } from "@prisma/client";
import { provideSingleton } from "../../../infrastructure/ioc/provide-singleton";
import * as jwt from 'jsonwebtoken'
import { CreateUserDto, LoginBodyDto, RefreshTokenDto } from "../../dtos/auth/auth-dto";
import { TokenService } from "../token/token.service";
import { UserService } from "../users/users-services";

import { NotFoundException } from "../../../../shared/common/exceptions/not-found-exception";
import { config } from "../../../infrastructure/env";
import { UnAuthorizedException } from "../../../../shared/common/exceptions/unauthorized-exception";


@provideSingleton(AuthServices)
export class AuthServices {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register(data: CreateUserDto) {
    return await this.userService.create(data);
  }

  async login(data: LoginBodyDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.validate(data.email, data.password);
    return await this.tokenService.createJwtToken(user);
  }
  
  async refresh(refreshToken: string,user:User): Promise<{ accessToken: string; refreshToken: string }> {
    const isUserValidate=await this.userService.getById(user?.id)
    if(!isUserValidate){
    throw new NotFoundException("User not found")
    }
    const isTokenvalid= jwt.verify(refreshToken,config.secret as string)
     if (!isTokenvalid) {
       throw new UnAuthorizedException("Invalid Refresh Token")
     }
    
      return await this.tokenService.createJwtToken(user);
  }
}
