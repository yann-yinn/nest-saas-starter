import { Module } from '@nestjs/common';
import { AuthSessionController } from './auth-session.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthSessionController],
})
export class AuthSessionModule {}
