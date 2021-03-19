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
  getPlans(): Promise<object[]> {
   return this.stripeService.getPlans()
  }

  @Post("create-checkout-session")
  async createCheckoutSession(@Res() res: Response, @Req() req: Request, @Body() createCheckoutSessionDto: createCheckoutSessionDto) {
    const priceId: string = req.body.priceId;

    if (!priceId) {
      res.status(400);
      res.send({
        error: {
          message:
            'Error: "priceId" is missing. Your request body Should contain a stringified JSON with a priceId property: {"priceId": "abc"}',
        },
      });
    }
  
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

}
