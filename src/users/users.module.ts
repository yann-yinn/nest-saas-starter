import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema } from './users.schema';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './passport/local.strategy';
import { ConfigModule } from '@nestjs/config';
import usersConfig from './users.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [usersConfig],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('authJwtSecretKey'),
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [UsersService, LocalStrategy],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
