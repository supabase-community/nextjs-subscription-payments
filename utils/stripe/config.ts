import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '';

export const stripe = stripeKey 
  ? new Stripe(stripeKey, {
      // https://github.com/stripe/stripe-node#configuration
      // https://stripe.com/docs/api/versioning
      // @ts-ignore
      apiVersion: null,
      // Register this as an official Stripe plugin.
      // https://stripe.com/docs/building-plugins#setappinfo
      appInfo: {
        name: 'Next.js Subscription Starter',
        version: '0.0.0',
        url: 'https://github.com/vercel/nextjs-subscription-payments'
      }
    })
  : null;
