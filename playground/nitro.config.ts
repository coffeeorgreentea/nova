import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  compatibilityDate: "2024-08-04",
  runtimeConfig: {
    stripe: {
      apiKey: "",
      webhookSecret: "",
    },
  },
});
