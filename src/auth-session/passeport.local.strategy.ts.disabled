import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/users.interfaces';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    // Login by email instead of default username field.
    super({ usernameField: 'email' });
  }

  /**
   * Passport verify callback.
   * The purpose of a verify callback is to find
   * the user that possesses a set of credentials.
   *
   * This callback is triggered by using
   * "@UseGuards(AuthGuard('local'))" on a controller.
   *
   * Object returned by this method will fill "req.user" object.
   */
  async validate(username: string, password: string): Promise<User> {
    // actually, here "username" is the "email" field.
    const user = await this.usersService.findOneByCredentials(
      username,
      password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
