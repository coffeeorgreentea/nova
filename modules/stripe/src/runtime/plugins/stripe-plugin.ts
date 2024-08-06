import { defineNovaPlugin } from "@gtc-nova/kit/runtime";
import { useRuntimeConfig } from "nitro/runtime";
import type { StripeFeatures } from "../../features";
import { initStripe } from "../utils/stripe";
import { getVirtualWebhooks } from "../exports";
import consola from "consola";
import type { Payment, Subscription, Webhook } from "../../types";
import { eventHandler, readRawBody } from "h3";

interface StripeInitializeReturn {
  stripeOptions: any;
}

interface StripeFeatureHandlerMap extends Record<keyof StripeFeatures, any> {
  payments: Payment;
  subscriptions: Subscription;
  webhooks: Webhook;
}

export default defineNovaPlugin<
  StripeFeatures,
  StripeFeatureHandlerMap,
  StripeInitializeReturn,
  Promise<any>,
  any
>({
  useRuntimeConfig,
  initialize: (nitro, config) => {
    const stripeOptions = config.stripe || {};

    const handler = eventHandler(async (event) => {
      const rawBody = await readRawBody(event);

      if (!rawBody) {
        return {
          status: 400,
          body: JSON.stringify({ error: "No body" }),
        };
      }

      const signature = event.headers.get("stripe-signature");
      if (!signature) {
        return {
          status: 400,
          body: JSON.stringify({ error: "No signature" }),
        };
      }

      try {
        const stripeEvent = nitro.stripe.client.client.webhooks.constructEvent(
          rawBody,
          signature,
          useRuntimeConfig().stripe.webhookSecret
        );

        if (!stripeEvent) {
          return {
            status: 400,
            body: JSON.stringify({ error: "Invalid signature" }),
          };
        }

        if (!nitro.stripe.webhooks[stripeEvent.type]) {
          consola.warn(`No handler for event type: ${stripeEvent.type}`);
          return {
            status: 200,
            body: JSON.stringify({ received: true }),
          };
        }

        const handler = nitro.stripe.webhooks[stripeEvent.type].handler;

        if (handler) {
          await handler(stripeEvent, nitro.stripe.client.client);
        } else {
          consola.warn(`No handler for event type: ${stripeEvent.type}`);
        }
        return { status: 200, body: JSON.stringify({ received: true }) };
      } catch (err) {
        consola.error("Error processing webhook:", err);
        return {
          status: 400,
          body: JSON.stringify({ error: "Webhook Error" }),
        };
      }
    });

    // I think nightly builds of h3 should fix this cast
    nitro.router.post("/stripe/webhook", handler as any);

    return { stripeOptions };
  },
  // @ts-ignore
  before: initStripe,
  runtimeSetup: {
    webhooks: {
      getVirtualHandlers: getVirtualWebhooks,
      initFeatureHandlers: async (nitro, handlers) => {
        for (const webhook of handlers) {
          const fn = (await webhook.handler()).default;
          nitro.stripe.webhooks[fn.event] = fn;
        }
      },
    },
  },
  after: (nitro, br) => {
    consola.info("Stripe plugin initialized.");
    consola.info("Payments:", Object.keys(nitro.stripe.payments));
    consola.info("Subscriptions:", Object.keys(nitro.stripe.subscriptions));
    consola.info("Webhooks:", Object.keys(nitro.stripe.webhooks));
  },
});
