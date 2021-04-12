import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { PartialType, PickType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
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
  @ApiProperty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly newPassword!: string;
}
