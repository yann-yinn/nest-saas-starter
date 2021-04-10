import { Module } from '@nestjs/common';
import { AuthJwtController } from './auth-jwt.controller';
import { AuthJwtService } from './auth-jwt.service';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import authJwtConfig from '../auth-jwt/auth-jwt.config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authJwtConfig],
    }),
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('authJwtSecretKey'),
          signOptions: {
            expiresIn: '1 day',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthJwtController],
  providers: [AuthJwtService, LocalStrategy, JwtStrategy],
})
export class AuthJwtModule {}
