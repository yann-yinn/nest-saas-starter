import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { PartialType, PickType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class loginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}

export class ResetPasswordDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;

  @IsString()
  @IsNotEmpty()
  readonly newPassword!: string;
}
