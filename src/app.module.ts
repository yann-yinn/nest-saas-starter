import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import appConfig from './app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthJwtModule } from './auth-jwt/auth-jwt.module';
import { ConfigService } from '@nestjs/config';
import { AuthSessionModule } from './auth-session/auth-session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get('mongoUrl'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
    }),
    StripeModule,
    UsersModule,
    AuthJwtModule,
    AuthSessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
