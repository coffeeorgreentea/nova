import Stripe from "stripe";
import type { NitroApp } from "nitro/types";
import type { StripeConfig } from "../../types";

export class StripeClient {
  constructor(public client: Stripe) {}

  // Add any additional methods you need here
}

export async function initStripe(nitroApp: NitroApp, config: StripeConfig) {
  if (nitroApp.stripe?.client) {
    console.warn("Stripe client already initialized");
    return;
  }

  const stripe = new Stripe(config.apiKey, {
    apiVersion: "2024-06-20",
  });

  const client = new StripeClient(stripe);

  nitroApp.stripe = {
    client,
    payments: nitroApp.stripe?.payments || {},
    subscriptions: nitroApp.stripe?.subscriptions || {},
    webhooks: nitroApp.stripe?.webhooks || {},
  };

  nitroApp.hooks.hook("close", async () => {
    // Add any cleanup logic if needed
  });
}
