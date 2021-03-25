import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

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

export class UpdateCustomerDto {
  @IsString()
  readonly name!: string;

  @IsString()
  @IsEmail()
  readonly email!: string;

  @IsString()
  readonly password!: string;
}

export class loginUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}
