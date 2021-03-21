import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly username!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;
}

export class UpdateCustomerDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly username!: string;

  @IsString()
  @IsEmail()
  readonly email!: string;
}
