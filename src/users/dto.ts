import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}

export class UpdateCustomerDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly name!: string;

  @IsString()
  @IsEmail()
  readonly email!: string;

  @IsString()
  readonly password!: string;
}
