import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    console.log('serializeUser');
    done(null, user._id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    console.log('deserializeUser');
    return await this.usersService
      .findOne({ _id: Number(userId) })
      .then((user) => done(null, user))
      .catch((error) => done(error));
  }
}
