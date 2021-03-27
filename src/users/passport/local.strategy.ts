import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { User } from '../users.interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    // Login by email instead of default username field.
    super({ usernameField: 'email' });
  }

  /**
   * Trigger by "@UseGuards(AuthGuard('local'))" on a controller.
   *
   * Object returned by this method will fill req.user object.
   */
  async validate(username: string, password: string): Promise<User> {
    // actually, here "username" is the "email" field.
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
