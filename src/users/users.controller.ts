import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  test(): string {
    return 'hello';
  }
}
