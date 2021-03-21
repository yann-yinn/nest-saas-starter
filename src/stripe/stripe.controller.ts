import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { AdapterService } from './adapter.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import Stripe from 'stripe';
import { createCheckoutSessionDto } from './dto';

@Controller('api/stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private configService: ConfigService,
    private adapterService: AdapterService,
  ) {}

  /**
   * Récupérer la liste des plans depuis Stripe.
   */
  @Get('plans')
  getPlans() {
    return this.stripeService.getPlans();
  }

  /**
   * Commence une nouvelle session d'achat. Retourne un sessionId
   * qui pourra être utilisé par le client pour redirigé vers Stripe Checkout.
   */
  @Post('create-checkout-session')
  async createCheckoutSession(
    @Req() req: Request,
    @Body() createCheckoutSessionDto: createCheckoutSessionDto,
  ) {
    const priceId: string = req.body.priceId;

    let config: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      // en cas de succès du paiement, le visiteur sera redirigé à cette adresse:
      success_url: <string>this.configService.get('stripeCheckoutSuccessUrl'),
      // en cas d'annulation du paiement, rediriger le visiteur à cette adresse:
      cancel_url: <string>this.configService.get('stripeCheckoutCancelUrl'),
    };

    await this.adapterService.onCreateCheckoutSession({
      req,
      config,
      priceId,
    });

    const session = await this.stripeService
      .getStripe()
      .checkout.sessions.create(config);
    return { sessionId: session.id };
  }

  /**
   * Stripe enverra des données sur ce chemin lors d'évènement majeurs
   * comme un abonnement acheté avec succès.
   */
  @Post('webhooks')
  async webhooks(@Req() req: Request) {
    if (!this.configService.get('stripeWebhookSecret')) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'process.env.stripeWebhookSecret is not defined.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const event: Stripe.Event = this.stripeService
        .getStripe()
        .webhooks.constructEvent(
          req.body,
          <string>req.headers['stripe-signature'],
          <string>this.configService.get('stripeWebhookSecret'),
        );
      await this.adapterService.onWebhooks({ req, event });
      return { status: 'ok' };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('create-customer-portal-session')
  async createCustomerPortalSession(@Req() req: Request) {
    const config: Stripe.BillingPortal.SessionCreateParams = {
      customer: '',
      return_url: this.configService.get('stripeBillingReturnUrl'),
    };

    await this.adapterService.onCreateCustomerPortalSession({ req, config });

    if (!config.customer) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: '"customerId" is missing: ' + config.customer,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    try {
      const portalsession = await this.stripeService
        .getStripe()
        .billingPortal.sessions.create(config);
      return { url: portalsession.url };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
