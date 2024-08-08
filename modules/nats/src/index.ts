import { defineNovaModule } from "@gtc-nova/kit";
import { natsFeatures, type NatsFeatures } from "./features";
import echo from "./echo";

export const commands = [echo];

export const natsModule = defineNovaModule<NatsFeatures>({
  name: "nats",
  features: natsFeatures,
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

export default natsModule;
