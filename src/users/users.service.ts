import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';
import { User } from './users.interfaces';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User | any>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Create a new user, except if a user with the same email already exists
   * Return null if a user already exists
   */
  async create(createUserDto: CreateUserDto): Promise<User | null> {
    let existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      return null;
    } else {
      const user = new this.userModel(createUserDto);
      user.password = await this.hashPassword(user.password);
      return await user.save();
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).lean().exec();
  }

  async validateUser(email: string, password: string): Promise<any> {
    // @FIXME: password encryption to find user
    const user = await this.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
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
