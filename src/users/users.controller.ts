import {
  Controller,
  Post,
  Body,
  Res,
  Request,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { loginUserDto } from '../users/dto';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const createdUser = await this.usersService.create(createUserDto);
    const status = createdUser ? HttpStatus.CREATED : HttpStatus.OK;
    res.status(status).send(createdUser);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any, @Body() loginUserDto: loginUserDto) {
    return this.usersService.generateJwt(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req: any) {
    return req.user;
  }
}
