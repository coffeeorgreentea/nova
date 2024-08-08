#!/usr/bin/env node
import { loadConfig } from "c12";
import { runMain } from "citty";
import { createNovaCli } from "../";
import { loadCommands } from "../utils/command-loader";
import type { NovaCLIConfig } from "../types";

const main = async () => {
  const { config } = await loadConfig<NovaCLIConfig>({
    configFile: "cli.config",
  });

  const commands = await loadCommands(config.cliDir);

  const cli = createNovaCli({
    name: config.name || "nova",
    version: config.version || "0.0.0",
    description: config.description || "A Nova CLI tool",
    nitro: config.nitro,
    modules: config.modules || [],
    commands,
    cliDir: config.cliDir,
  });

  runMain(cli);
};

main();
