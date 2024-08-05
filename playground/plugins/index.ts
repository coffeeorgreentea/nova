import { defineNitroPlugin } from "nitro/runtime";
import type { NovaFeatures } from "@gtc-nova/kit";

type Test = NovaFeatures['nats']['subscriptions']['/userNotifications']

export default defineNitroPlugin(async (nitro) => {
  console.log("Hello, world!");
});
