export const stripeFeatures = {
  webhooks: "stripe/webhooks",
} as const;

export type StripeFeatures = typeof stripeFeatures;
