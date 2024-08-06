import { defineNovaModule } from "@gtc-nova/kit";
import { stripeFeatures, type StripeFeatures } from "./features";

export const stripeModule = defineNovaModule<StripeFeatures>({
  name: "stripe",
  features: stripeFeatures,
  featureTypeFunctions: {
    payments: () => {
      console.log("payments");
    },
    subscriptions: () => {
      console.log("subscriptions");
    },
    webhooks: () => {
      console.log("webhooks");
    },
  },
  pluginsDir: "./../src/runtime/plugins",
  metaUrl: import.meta.url,
  hooks: [],
});

export type * from "./types";
