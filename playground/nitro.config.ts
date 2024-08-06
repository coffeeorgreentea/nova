import { defineNitroConfig } from "nitro/config";
import { natsModule } from "@gtc-nova/nats";
import { stripeModule } from "@gtc-nova/stripe";

export default defineNitroConfig({
  compatibilityDate: "2024-08-04",
  modules: [natsModule, stripeModule],
  runtimeConfig: {
    stripe: {
      apiKey: "",
      webhookSecret: "",
    },
  },
});
