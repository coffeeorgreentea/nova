import type { NovaCLIConfig } from "@gtc-nova/kit";
import nats from "@gtc-nova/nats";
export default {
  name: "nova",
  version: "0.0.1",
  description: "Nova CLI",
  nitro: true,
  cliDir: "cli",
  modules: [nats],
} satisfies NovaCLIConfig;
