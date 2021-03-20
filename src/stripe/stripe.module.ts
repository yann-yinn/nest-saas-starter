import { Module } from '@nestjs/common';
import { AdapterService } from './adapter.service';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  controllers: [StripeController],
  providers: [StripeService, AdapterService],
})
export class StripeModule {}
