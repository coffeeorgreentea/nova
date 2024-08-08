import { useNitroApp } from "nitro/runtime";
import { defineEventHandler } from "h3";
import type { NovaFeatures } from "@gtc-nova/kit";

type Test = NovaFeatures["nats"]["publishers"]["/userEvents"];

export default defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();

  nitroApp.hooks.hook("nova:nats:before", (nitroApp, payload) => {});

  return "Hello, world!";
});
