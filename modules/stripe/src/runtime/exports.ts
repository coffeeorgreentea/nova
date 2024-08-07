// @ts-ignore
import { handlers as webhooks } from "#stripe-virtual/webhooks";
import type { BaseVirtualHandler } from "@gtc-nova/kit/runtime";
import type { Webhook } from "../types";

export const getVirtualWebhooks = (): BaseVirtualHandler<Webhook>[] => webhooks;
