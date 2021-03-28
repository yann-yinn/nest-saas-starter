import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';
import { User } from './users.interfaces';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User | any>) {}

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

  async findOne(filter: object, project?: object): Promise<User | null> {
    return await this.userModel.findOne(filter, project).lean().exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).lean().exec();
  }

  async findOneByCredentials(credentials: {
    email: string;
    password: string;
  }): Promise<User | null> {
    const user = await this.findOneByEmail(credentials.email);
    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      return user;
    }
    return null;
  }
}
