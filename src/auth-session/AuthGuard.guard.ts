import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.usersService.findOne({ _id: request.session.user });
    request.user = user;
    return user ? true : false;
  }
}
