// @ts-ignore
import { handlers as publishers } from "#nats-virtual/publishers";
// @ts-ignore
import { handlers as subscribers } from "#nats-virtual/subscriptions";

import type { BaseVirtualHandler } from "@gtc-nova/kit/runtime";
import type { Publisher, Subscriber } from "../types";

export const getVirtualPublishers = (): BaseVirtualHandler<Publisher>[] =>
  publishers;

export const getVirtualSubscriptions = (): BaseVirtualHandler<Subscriber>[] =>
  subscribers;
