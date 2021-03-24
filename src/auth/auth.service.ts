import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

/**
 * Our AuthService has the job of retrieving a user and verifying the password.
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // @FIXME: password encryption to find user
    const user = await this.usersService.findOneByEmail(email);
    console.log('user', user);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async generateJwt(user: any) {
    const payload = { name: user.name, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
