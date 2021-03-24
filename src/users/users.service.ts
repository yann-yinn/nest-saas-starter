import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';
import { User } from './users.interfaces';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User | any>) {}

  /**
   * Create a new user, except if a user with the same email already exists
   * Return null if a user already exists
   */
  async create(createUserDto: CreateUserDto): Promise<User | null> {
    let result = await this.findOneByEmail(createUserDto.email);
    if (result) {
      const user = new this.userModel(createUserDto);
      result = await user.save();
    }
    return result;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).lean().exec();
  }
}
