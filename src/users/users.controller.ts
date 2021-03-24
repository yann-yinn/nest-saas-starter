import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { Response } from 'express';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const createdUser = await this.usersService.create(createUserDto);
    const status = createdUser ? HttpStatus.CREATED : HttpStatus.OK;
    res.status(status).send(createdUser);
  }
}
