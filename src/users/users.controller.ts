import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ResetPasswordDto } from './users.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const createdUser = await this.usersService.create(createUserDto);
    const status = createdUser ? HttpStatus.CREATED : HttpStatus.OK;
    res.status(status).send(createdUser);
  }

  @Post('reset-password')
  @UseGuards(AuthGuard('jwt'))
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const updatedUser = await this.usersService.resetPassword(resetPasswordDto);
    return updatedUser;
  }
}
