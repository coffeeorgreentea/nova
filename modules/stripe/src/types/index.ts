import type { StripeClient } from "../runtime/utils/stripe";
import type Stripe from "stripe";

export interface StripeConfig {
  apiKey: string;
  webhookSecret: string;
}

export interface Payment {
  type: string;
  handler: (stripe: Stripe, data: any) => Promise<any>;
}

export interface Subscription {
  type: string;
  handler: (stripe: Stripe, data: any) => Promise<any>;
}

export interface Webhook {
  event: string;
  handler: (event: Stripe.Event, stripe: Stripe) => Promise<void>;
}

declare module "nitro/types" {
  interface NitroApp {
    stripe: {
      client: StripeClient;
      payments: Record<string, Payment>;
      subscriptions: Record<string, Subscription>;
      webhooks: Record<string, Webhook>;
    };
  }
}
