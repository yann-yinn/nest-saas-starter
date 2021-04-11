import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private connection: Connection,
  ) {}

  /**
   * Create a new user, except if a user with the same email already exists
   * Return null if a user already exists
   */
  public async create(createUserDto: CreateUserDto): Promise<User | null> {
    let existingUser = await this.findOneByEmail(createUserDto.email);
    if (existingUser) {
      return null;
    } else {
      const newUser = await this.usersRepository.create(createUserDto);
      newUser.password = await this.hashPassword(newUser.password);
      return this.usersRepository.save(newUser);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async findOne(filter: object): Promise<User | undefined> {
    const user = this.usersRepository.findOne(filter);
    return user;
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ email });
    return user;
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
