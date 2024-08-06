import { defineNitroConfig } from "nitro/config";
import { natsModule } from "@gtc-nova/nats";

export default defineNitroConfig({
  compatibilityDate: "2024-08-04",
  modules: [natsModule],
});
