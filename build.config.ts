import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  failOnWarn: false,
  declaration: "compatible",

  entries: [
    { input: "src/runtime/index.ts", outDir: "dist/runtime" },
    // Config
    { input: "src/index.ts", outDir: "dist" },
    // Core
    { input: "src/vendor/index.ts", outDir: "dist/vendor" },
  ],

  externals: [
    "dot-prop",
    "globby",
    "ohash",
    "pathe",
    "rollup",
    "ufo",
    "#nitro-internal-virtual/error-handler",
    "#nitro-internal-virtual/plugins",
    "#nitro-internal-virtual/server-handlers",
    "#nitro-internal-virtual/storage",
    "#nitro-internal-virtual/tasks",
    "#nitro-internal-virtual/database",
    "nitro/kit",
    "nitro/runtime",
    "consola",
    "consola/utils",
    "klona",
    "destr",
    "h3",
    "hookable",
    "ofetch",
    "unenv/runtime/fetch/index",
    "unstorage",
    "defu",
    "radix3",
    "unctx",
    "croner",
    "std-env",
    "db0",
    "scule",
    "cookie-es",
    "uncrypto",
    "iron-webcrypto",
    "unenv",
    "nitro",
    "nitro-nightly@3.0.0-beta-28665895.e727afda_typescript@5.5.3",
  ],
});
