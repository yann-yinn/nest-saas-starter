import { Controller, Get, Req, Res, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AdapterService } from './adapter.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import Stripe from "stripe";
import { createCheckoutSessionDto } from "./dto";

@Controller('api/stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService, private configService: ConfigService,  private adapterService: AdapterService) {}

  @Get('plans')
  getPlans() {
    return this.stripeService.getPlans();
  }

  @Post("create-checkout-session")
  async createCheckoutSession(@Res() res: Response, @Req() req: Request, @Body() createCheckoutSessionDto: createCheckoutSessionDto) {
    const priceId: string = req.body.priceId;
    
    try {
      let checkoutConfig: Stripe.Checkout.SessionCreateParams = {
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            // For metered billing, do not pass quantity
            quantity: 1,
          },
        ],
        // en cas de succès du paiement, le visiteur sera redirigé à cette adresse:
        success_url: this.configService.get('stripeCheckoutSuccessUrl'),
        // en cas d'annulation du paiement, rediriger le visiteur à cette adresse:
        cancel_url: this.configService.get('stripeCheckoutCancelUrl'),
      };
      
      await this.adapterService.onCreateCheckoutSession({
        req,
        checkoutConfig,
        priceId,
      });
  
      const session = await this.stripeService.getStripe().checkout.sessions.create(checkoutConfig);
      res.send({
        sessionId: session.id,
      });
    } catch (e) {
      res.status(400);
      return res.send({
        error: {
          message: e.message,
        },
      });
    }
  }

  @Get('webhooks')
  async webhooks(@Res() res: Response, @Req() req: Request) {

    const signature = req.headers["stripe-signature"];
    if (!this.configService.get('stripeWebhookSecret')) {
      res.status(400);
      res.send({
        error: {
          message: "config.stripeWebhookSecret is not defined",
        },
      });
      return;
    }
    try {
      const event = this.stripeService.getStripe().webhooks.constructEvent(
        req.body,
        signature,
        this.configService.get('stripeWebhookSecret')
      );
      await this.adapterService.onWebhooks({ req, event });
      return { status: "ok" }
    } catch (e) {
      console.log("e", e);
      res.status(400).send({
        error: {
          message: e.message,
        },
      });
      return;
    }
  }

  @Get('create-customer-portal-session')
  async createCustomerPortalSession(@Res() res: Response, @Req() req: Request) {

    const portalConfig: Stripe.BillingPortal.SessionCreateParams = {
      customer: undefined,
      return_url: this.configService.get('stripeBillingReturnUrl'),
    }

    await this.adapterService.onCreateCustomerPortalSession({ req, portalConfig });

    if (!portalConfig.customer) {
      res.status(400).send({
        error: {
          message: 'Error: "customerId" is required. Received: ' + portalConfig.customer,
        },
      });
    } else {
      try {
        const portalsession = await this.stripeService.getStripe().billingPortal.sessions.create(portalConfig);
        res.send({
          url: portalsession.url,
        });
      } catch (e) {
        res.status(400);
        res.send({
          error: {
            message: e.message,
          },
        });
      }
    }
  }
}
