import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './users.dto';
import { User } from './users.interfaces';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  /**
   * Create a new user, except if a user with the same email already exists.
   */
  async create(createUserDto: CreateUserDto): Promise<User | null> {
    let existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      return null;
    } else {
      const userDoc = new this.userModel(createUserDto);
      userDoc.password = await this.hashPassword(userDoc.password);
      const savedUserDoc = await userDoc.save();
      return savedUserDoc.toObject();
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findOne(filter: object, project?: object): Promise<User | null> {
    return this.userModel.findOne(filter, project).lean();
  }

  async findOneByEmail(email: string, project?: object): Promise<User | null> {
    return this.userModel.findOne({ email }, project).lean();
  }

  async findOneByCredentials(credentials: {
    email: string;
    password: string;
  }): Promise<User | null> {
    const user = await this.findOneByEmail(credentials.email);
    if (!user) {
      return null;
    }
    if (!user.password) {
      throw new Error('findOneByCredentials: Password field is missing');
    }
    // compare user password with submitted password
    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      return user;
    }
    return null;
  }

  public async resetPassword(credentials: {
    email: string;
    password: string;
    newPassword: string;
  }): Promise<User | null> {
    const user = await this.findOneByCredentials({
      email: credentials.email,
      password: credentials.password,
    });
    if (user) {
      this.userModel.updateOne(
        { _id: user._id },
        {
          password: await this.hashPassword(credentials.newPassword),
        },
      );
    }
    return user;
  }
}
