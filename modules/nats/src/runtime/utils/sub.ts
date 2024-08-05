import type { NovaFeatures } from "@gtc-nova/kit";
import { type SubscriptionOptions as SO, type Codec, JSONCodec } from "nats";

type NatsSubscriptionOptions = Omit<SO, "callback">;
export interface SubscriptionDefinition<T> extends NatsSubscriptionOptions {
  subject: string;
  codec?: Codec<T>;
  callback: (data: T) => Promise<void> | void;
}

export function defineSubscriber<T = any>(
  def: SubscriptionDefinition<T>
): SubscriptionDefinition<T> {
  const { subject, codec = JSONCodec(), ...options } = def;
  return { subject, codec, ...options };
}


// @ts-ignore
export type SubscriptionHandlerType = NovaFeatures["nats"]["subscriptions"];
