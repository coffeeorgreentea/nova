import { useNitroApp } from "nitro/runtime";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();

  console.log(nitroApp.nats.client);

  return "Hello, world!";
});
