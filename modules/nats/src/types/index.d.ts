import type { NatsClient } from "../runtime/utils/nats";

export interface NatsConfig {
  servers: string | string[];
}

export interface Publisher<T = any> {
  subject: string;
  publish: (data: T) => Promise<void>;
}

export interface Subscriber<T = any> {
  subject: string;
  handler: (data: T) => void | Promise<void>;
}

declare module "nitro/types" {
  interface NitroApp {
    nats: {
      client: NatsClient;
      publishers: Record<string, Publisher>;
      subscribers: Record<string, Subscriber>;
    };
  }
}
