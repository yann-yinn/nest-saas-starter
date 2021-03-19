import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import Stripe from "stripe"

interface onCreateCheckoutSessionParams {
  checkoutConfig: Stripe.Checkout.SessionCreateParams;
  req: Request,
  priceId: string
}

interface onWebhooksParams {
  req: Request,
  event: Stripe.Event;
}

interface onCreateCustomerPortalSessionPrams {
  portalConfig: Stripe.BillingPortal.SessionCreateParams;
  req: Request,
}


@Injectable()
export class AdapterService {
  async onCreateCheckoutSession(params: onCreateCheckoutSessionParams) {

  }
  async onWebhooks(params: onWebhooksParams) {

  }
  async onCreateCustomerPortalSession(params: onCreateCustomerPortalSessionPrams) {
    
  }
}
