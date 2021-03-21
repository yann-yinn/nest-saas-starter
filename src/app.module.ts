import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import stripeConfig from './stripe/stripe.config';
import authConfig from './auth/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [stripeConfig, authConfig] }),
    StripeModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
