import { withFrameworkConfig } from "../utils/framework";
import {
  build as originalBuild,
  dev as originalDev,
  prepare as originalPrepare,
} from "@gtc-nova/vendor";
import type { NitroConfig } from "nitro/types";

const customNitroConfig: Partial<NitroConfig> = {};

export const nitroCommands = {
  dev: () =>
    Promise.resolve(withFrameworkConfig(originalDev, customNitroConfig)),
  build: () =>
    Promise.resolve(withFrameworkConfig(originalBuild, customNitroConfig)),
  prepare: () =>
    Promise.resolve(withFrameworkConfig(originalPrepare, customNitroConfig)),
};
