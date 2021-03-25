import { Module } from '@nestjs/common';
import { AdapterService } from './adapter.service';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import stripeConfig from './stripe.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [stripeConfig],
    }),
  ],
  controllers: [StripeController],
  providers: [StripeService, AdapterService],
})
export class StripeModule {}
