import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import Stripe from 'stripe';

@Injectable()
export class AdapterService {
  async onCreateCheckoutSession(params: {
    config: Stripe.Checkout.SessionCreateParams;
    req: Request;
    priceId: string;
  }) {
    // params.config.customer
    // params.config.client_reference_id
    // params.config.metadata = {}
  }

  async onWebhooks(params: { req: Request; event: Stripe.Event }) {
    switch (params.event.type) {
      // Le paiement est un succès et l'abonnement a été crée!
      case 'checkout.session.completed':
        const session = params.event.data.object;
        // console.log(JSON.stringify(session, 0, 2));
        /*
        await db()
          .collection("users")
          .updateOne(
            { _id: oid(session.client_reference_id) },
            {
              $set: {
                stripeCustomerId: session.customer, // set by stripe
                stripeSubscriptionId: session.subscription, // set by Stripe
              },
            }
          );
        */
        break;

      /**
       * Un abonnement a été upgradé ou downgradé
       */
      case 'customer.subscription.updated':
        const subscriptionUpdated = params.event.data.object;
        break;

      /**
       * Un abonnement a été annulé ou est arrivé à sa fin.
       */
      case 'customer.subscription.deleted':
        break;

      case 'invoice.payment_failed':
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.

        break;

      case 'invoice.paid':
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.

        break;

      default:
      // Unhandled event type
    }
  }
  async onCreateCustomerPortalSession(params: {
    config: Stripe.BillingPortal.SessionCreateParams;
    req: Request;
  }) {
    // ajouter le customerId qui est requis, obligatoire.
    // params.config.customer = "abc"
  }
}
