import { Module } from '@nestjs/common';
import { AuthSessionController } from './auth-session.controller';
import { LocalStrategy } from './passeport.local.strategy';
import { LocalSerializer } from './passeport.local.serializer';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthSessionController],
  providers: [LocalStrategy, LocalSerializer],
})
export class AuthSessionModule {}
