import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import Stripe from "stripe"

interface onCreateCheckoutSessionParams {
  checkoutConfig: Stripe.Checkout.SessionCreateParams;
  req: Request,
  priceId: string
}

@Injectable()
export class AdapterService {
  async onCreateCheckoutSession(params: onCreateCheckoutSessionParams) {}
  // async onWehbooks({ req, checkoutConfig }) {}
  //async onCreateCustomerPortalSession({ req, checkoutConfig }) {}
}
