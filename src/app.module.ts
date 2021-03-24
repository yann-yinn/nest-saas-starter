import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
//import { UsersModule } from './users/users.module';
import stripeConfig from './stripe/stripe.config';
import authConfig from './auth/auth.config';
import appConfig from './app.config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ExampleModule } from './example/example.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [stripeConfig, authConfig, appConfig],
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
    AuthModule,
    ExampleModule,
    //UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
