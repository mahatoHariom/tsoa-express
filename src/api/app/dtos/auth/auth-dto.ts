import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, MinLength, minLength } from 'class-validator';

export class LoginBodyDto {
  @IsEmail({}, { message: 'Please write in email format.' })
  @IsNotEmpty({ message: 'Please enter an email.' })
  email: string;

  @IsString({ message: 'Please enter a password.' })
  @IsNotEmpty({ message: 'Please enter a password.' })
  password: string;
}

export class CreateUserDto {
  @IsString({ message: 'Please enter name' })
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Please write in email format.' })
  @IsNotEmpty({ message: 'Please enter an email.' })
  email: string;

  @IsString({ message: 'Please enter password' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(5, { message: 'must be more than 5 characters' })
  @MaxLength(255, { message: 'cannot be longer than 255 characters' })
  password: string;
}

export class RefreshTokenDto {
  @IsString({ message: 'Refresh Token required' })
  @IsNotEmpty()
  refreshToken: string;
}
