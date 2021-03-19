/**
 * @file gérer la configuration de votre gestion des abonnements:
 */
export default ()  => ({
  // voir le fichier.env.example
  prices: <string[]>process.env.STRIPE_PRICES_IDS.split(",").map((v) => v.trim()),
  // voir le fichier .env.example
  stripeSecretKey: <string>process.env.STRIPE_SECRET_KEY.trim(),
  // voir le fichier .env.example
  stripeWebhookSecret: <string>process.env.STRIPE_WEBHOOK_SECRET.trim(),
  // Addresse de redirection une fois un paiement effectué avec succès
  stripeCheckoutSuccessUrl: <string>`${process.env.STRIPE_SITE_URL}/account`,
  // si la personne annule la commande avant de payer, on la renvoie à cette adresse
  stripeCheckoutCancelUrl: <string>`${process.env.STRIPE_SITE_URL}/subscribe`,
  // le lien de retour depuis le "Customer Portal" (gestion des abonnements en cours)
  stripeBillingReturnUrl: <string>`${process.env.STRIPE_SITE_URL}/account`,
});
