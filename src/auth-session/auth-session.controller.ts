import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { loginDto } from './dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/auth-session')
export class AuthSessionController {
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req: any, @Body() loginDto: loginDto) {
    req.session.user = { _id: req.user._id };
    return req.session;
  }
  @Get('test')
  async test(@Request() req: any) {
    return req.session.user;
  }
}
