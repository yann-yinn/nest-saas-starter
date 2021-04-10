import { Injectable } from '@nestjs/common';
import { TokenPayload } from './auth-jwt.interfaces';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // JWT properties https://www.iana.org/assignments/jwt/jwt.xhtml
  async generateJwt(user: {
    name: string;
    _id: string;
  }): Promise<{ access_token: string }> {
    const payload: TokenPayload = { name: user.name, sub: user._id };
    const accessToken: string = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
