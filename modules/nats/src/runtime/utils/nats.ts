import { connect, StringCodec, type NatsConnection } from "nats";
import type { NitroApp } from "nitro/types";
import type { NatsConfig } from "../../types";
import { Hookable } from "hookable";

export class NatsClient extends Hookable {
  constructor(public connection: NatsConnection) {
    super();
  }

  async publish<T = any>(subject: string, data: T): Promise<void> {
    const sc = StringCodec();
    await this.connection.publish(subject, sc.encode(JSON.stringify(data)));
  }

  subscribe<T = any>(
    subject: string,
    handler: (data: T) => void | Promise<void>
  ): void {
    const sc = StringCodec();
    const subscription = this.connection.subscribe(subject);
    (async () => {
      for await (const msg of subscription) {
        const data = JSON.parse(sc.decode(msg.data));
        await handler(data);
      }
    })().catch(console.error);
  }
}

export async function initNats(nitroApp: NitroApp, config: NatsConfig) {
  if (nitroApp.nats?.client) {
    console.warn("NATS connection already initialized");
    return;
  }

  const connection = await connect(config);
  const client = new NatsClient(connection);

  nitroApp.nats = {
    client,
    publishers: nitroApp.nats?.publishers || {},
    subscribers: nitroApp.nats?.subscribers || {},
  };

  nitroApp.hooks.hook("close", async () => {
    if (nitroApp.nats?.client.connection) {
      await nitroApp.nats.client.connection.drain();
    }
  });
}
