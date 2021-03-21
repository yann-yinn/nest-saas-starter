import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // configure passeport here.
    // For example login by "email" property instead of "username" default field.
    super({ usernameField: 'username' });
  }

  /**
   * This is the "verify callback" for passport,
   * which is where you tell Passport how to interact with your user store (database)
   * Here, you verify whether a user exists (and/or create a new user),
   * and whether their credentials are valid. (returning user if valid, null if not valid)
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
