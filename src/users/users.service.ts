import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  /**
   * Create a new user, except if a user with the same email already exists
   * Return null if a user already exists
   */
  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const result = await this.findOneByEmail(createUserDto.email);
    if (!result) {
      const user = new this.userModel(createUserDto);
      return user.save();
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findOne(username: string): Promise<User | null> {
    return this.users.find((user) => user.username === username);
  }

  async find() {
    return this.userModel.find();
  }
}
