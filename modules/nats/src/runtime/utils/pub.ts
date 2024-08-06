import type { NovaFeatures } from "@gtc-nova/kit";
import { JSONCodec, type Codec, type PublishOptions } from "nats";

export interface PublisherDefinition<T> {
  subject: string;
  codec?: Codec<T>;
  options: PublishOptions;
}

export function definePublisher<T = any>(
  def: PublisherDefinition<T>
): PublisherDefinition<T> {
  const { subject, codec = JSONCodec(), options } = def;
  return { subject, codec, options };
}

// @ts-ignore
export type PublisherHandlerType = NovaFeatures["nats"]["publishers"];
