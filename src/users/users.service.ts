import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
      const newUser = await this.usersRepository.create(createUserDto);
      newUser.password = await this.hashPassword(newUser.password);
      return this.usersRepository.save(newUser);
    }
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findOne(filter: object): Promise<User | undefined> {
    return this.usersRepository.findOne(filter);
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ email });
  }

  async findOneByCredentials(credentials: {
    email: string;
    password: string;
  }): Promise<User | null> {
    const user = await this.findOneByEmail(credentials.email);
    // compare user password with submitted password
    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      return user;
    }
    return null;
  }
}
