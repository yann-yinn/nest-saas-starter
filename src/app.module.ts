import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
import { TestModule } from './test/test.module';
import stripeConfig from './stripe/stripe.config';

@Module({
  imports: [StripeModule, ConfigModule.forRoot({ isGlobal: true, load: [stripeConfig], }), TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
