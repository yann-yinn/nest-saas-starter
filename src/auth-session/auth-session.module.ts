import { Module } from '@nestjs/common';
import { AuthSessionController } from './auth-session.controller';
import { LocalStrategy } from './passeport.local.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthSessionController],
  providers: [LocalStrategy],
})
export class AuthSessionModule {}
