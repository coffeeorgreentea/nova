import type { NovaFeatures } from "@gtc-nova/kit";
import type Stripe from "stripe";

export interface WebhookDefinition {
  event: string;
  handler: (event: Stripe.Event, stripe: Stripe) => Promise<void>;
}

export function defineWebhook(def: WebhookDefinition): WebhookDefinition {
  return def;
}

// @ts-ignore
export type WebhookHandlerType = NovaFeatures["stripe"]["webhooks"];
