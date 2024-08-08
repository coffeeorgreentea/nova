import { defineNovaModule } from "@gtc-nova/kit";
import { stripeFeatures, type StripeFeatures } from "./features";

export const stripeModule = defineNovaModule<StripeFeatures>({
  name: "stripe",
  features: stripeFeatures,
  typeExtension: {
    hookTypes: {
      runtimeAfterPayload: {},
      runtimeAfterReturn: {},
      runtimeBeforePayload: {},
      runtimeBeforeReturn: {},
    },

    imports: [],
  },
  pluginsDir: "./../src/runtime/plugins",
  metaUrl: import.meta.url,
});

export type * from "./types";
