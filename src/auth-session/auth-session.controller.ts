import {
  Controller,
  Post,
  Body,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { loginDto } from './dto';
import { UsersService } from '../users/users.service';

@Controller('api/auth-session')
export class AuthSessionController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Request() req: any, @Body() loginDto: loginDto) {
    const user = await this.usersService.findOneByCredentials({
      email: loginDto.email,
      password: loginDto.password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
