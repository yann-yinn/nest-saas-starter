import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password!: string;
}
