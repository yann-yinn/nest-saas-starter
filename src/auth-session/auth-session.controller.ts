import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { loginDto } from './dto';
import { UsersService } from '../users/users.service';
import { AuthGuard } from './AuthGuard.guard';

@Controller('api/auth-session')
export class AuthSessionController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Request() req: any, @Body() loginDto: loginDto) {
    // is there a user with this email and password in our database ?
    const user = await this.usersService.findOneByCredentials({
      email: loginDto.email,
      password: loginDto.password,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    // store the user id in session variable (thanks to express-session)
    req.session.user = user._id;
    return user;
  }

  @Get('test')
  @UseGuards(AuthGuard)
  async test(@Request() req: any) {
    return req.user;
  }
}
