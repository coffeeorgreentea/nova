import { defineNovaPlugin } from "@gtc-nova/kit/runtime";
import { useRuntimeConfig } from "nitro/runtime";
import type { NatsFeatures } from "../../features";
import { initNats } from "../utils/nats";
import { getVirtualPublishers, getVirtualSubscriptions } from "../exports";
import consola from "consola";
import type { Publisher, Subscriber } from "../../types";

interface NatsInitializeReturn {
  natsOptions: any;
  servers: string;
}

interface NatsFeatureHandlerMap extends Record<keyof NatsFeatures, any> {
  subscriptions: Subscriber;
  publishers: Publisher;
}
export default defineNovaPlugin<
  NatsFeatures,
  NatsFeatureHandlerMap,
  NatsInitializeReturn,
  Promise<any>,
  any
>({
  useRuntimeConfig,
  initialize: (nitro, config) => {
    const natsOptions = config.nats || {};
    const servers = natsOptions.url || "nats://192.168.50.78:4222";

    return {
      natsOptions,
      servers,
    };
  },
  // This runs before the feature initialization
  before: initNats,
  // This sets up the config for feature initialization
  runtimeSetup: {
    subscriptions: {
      getVirtualHandlers: getVirtualSubscriptions,
      initFeatureHandlers: async (nitro, handlers) => {
        for (const sub of handlers) {
          const fn = (await sub.handler()).default;

          try {
            nitro.nats.client.subscribe(fn.subject, async (data) => {
              await fn.handler(data);
            });
            
            consola.info("Subcribed to:", fn.subject);
          } catch (error) {
            consola.error("Failed to subscribe to:", fn.subject);
            consola.error(error);
          }
        }
      },
    },
    publishers: {
      getVirtualHandlers: getVirtualPublishers,
      initFeatureHandlers: async (nitro, handlers) => {
        consola.info("Initializing publishers...,", handlers);
        for (const pub of handlers) {
          const fn = (await pub.handler()).default;
          if (!pub.route) {
            consola.error("No route found for publisher. Subject:", fn.subject);
            return;
          }
          nitro.nats.publishers[pub.route] = fn;
        }
      },
    },
  },

  // This runs after the feature initialization
  after: (nitro, br) => {
    consola.info("Nats plugin initialized.");
    consola.info("Publishers:", Object.keys(nitro.nats.publishers));
  },
});
