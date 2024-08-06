// @ts-ignore
import { handlers as payments } from "#stripe-virtual/payments";
// @ts-ignore
import { handlers as subscriptions } from "#stripe-virtual/subscriptions";
// @ts-ignore
import { handlers as webhooks } from "#stripe-virtual/webhooks";

import type { BaseVirtualHandler } from "@gtc-nova/kit/runtime";
import type { Payment, Subscription, Webhook } from "../types";

export const getVirtualPayments = (): BaseVirtualHandler<Payment>[] => payments;
export const getVirtualSubscriptions = (): BaseVirtualHandler<Subscription>[] =>
  subscriptions;
export const getVirtualWebhooks = (): BaseVirtualHandler<Webhook>[] => webhooks;
