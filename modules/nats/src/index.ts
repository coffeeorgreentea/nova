import { defineNovaModule } from "@gtc-nova/kit";
import { natsFeatures, type NatsFeatures } from "./features";

export const natsModule = defineNovaModule<NatsFeatures>({
  name: "nats",
  features: natsFeatures,
  featureTypeFunctions: {
    subscriptions: () => {
      console.log("hooks");
    },
    publishers: () => {
      console.log("routes");
    },
  },
  pluginsDir: "./../src/runtime/plugins",
  metaUrl: import.meta.url,
  hooks: [],
});

export type * from "./types";