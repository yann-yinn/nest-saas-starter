import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';
import { TokenPayload } from '../auth-jwt.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('authJwtSecretKey'),
    });
  }

  /**
   * Trigger by "@UseGuards(AuthGuard('jwt'))" on a controller.
   * Object returned by this method will fill req.user object.
   *
   * @param payload
   * @returns
   */
  async validate(payload: TokenPayload): Promise<User | undefined> {
    const user = this.usersService.findOne({
      id: payload.sub,
    });
    return user;
  }
}
