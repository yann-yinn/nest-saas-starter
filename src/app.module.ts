import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import stripeConfig from './stripe/stripe.config';
import authConfig from './auth/auth.config';
import appConfig from './app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [stripeConfig, authConfig, appConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'default',
      useFactory: async (config: ConfigService) => ({
        uri: config.get('mongoUrl'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    StripeModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
