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

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, <string>user.password))) {
      return user;
    }
    return null;
  }

  // JWT properties https://www.iana.org/assignments/jwt/jwt.xhtml
  async generateJwt(user: {
    firstName: string;
    id: string;
  }): Promise<{ access_token: string }> {
    const payload: TokenPayload = { name: user.firstName, sub: user.id };
    const accessToken: string = this.jwtService.sign(payload);
    return {
      access_token: accessToken,
    };
  }
}
