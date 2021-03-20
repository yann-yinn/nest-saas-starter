import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from "stripe"

@Injectable()
export class StripeService {
  constructor( private configService: ConfigService) {}

  getStripe(): Stripe {
    return new Stripe(<string>this.configService.get('stripeSecretKey'), {
      apiVersion: '2020-08-27',
    });
  }

  async getPlans(): Promise<object[]> {
    const prices = <string[]>this.configService.get('prices');
    const plans: object[] = await Promise.all(
      prices.map((priceId) => {
        return this.getStripe().plans.retrieve(priceId).then((plan) => {
          return this.getStripe().products.retrieve(<string>plan.product).then((product) => {
            plan.product = product;
            return plan;
          });
        });
      })
    );
    return plans;
  }
}
