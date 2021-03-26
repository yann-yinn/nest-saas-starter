import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('authJwtSecretKey'),
    });
  }

  async validate(payload: any) {
    // Here we could do a database lookup in our validate() method to extract
    // more information about the user, resulting in a more enriched
    // user object being available in our Request
    const fullUser = this.usersService.findOne({
      _id: payload.sub,
    });
    console.log('fullUser', fullUser);
    if (!fullUser) {
      return null;
    }
    return fullUser;
  }
}
