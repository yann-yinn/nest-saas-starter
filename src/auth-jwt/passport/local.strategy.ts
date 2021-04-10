import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthJwtService } from '../auth-jwt.service';
import { User } from '../../users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authJwtService: AuthJwtService) {
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
    const user = await this.authJwtService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
