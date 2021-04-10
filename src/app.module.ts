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
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(<string>process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities: true,
      // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: process.env.NODE_ENV === 'development' ? true : false,
      ssl: true,
      extra: JSON.parse(<string>process.env.TYPEORM_DRIVER_EXTRA),
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
