import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { loginDto } from './auth-jwt.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthJwtService } from './auth-jwt.service';

@Controller('api/auth-jwt')
export class AuthJwtController {
  constructor(private readonly authJwtService: AuthJwtService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any, @Body() loginDto: loginDto) {
    return this.authJwtService.generateJwt(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userinfo')
  async me(@Request() req: any) {
    return req.user;
  }
}
