# Nova: A Toolkit for Building Nitro Modules

## Features

- 🚀 Easy module definition with `defineNovaModule`
- 🔌 Plugin system for runtime extensions
- 🏗️ Structured approach to organizing module features
- 🔄 Automatic type generation for enhanced developer experience

## Getting Started

To use Nova in your Nitro project, first install it:

```bash
npm install @gtc-nova/kit
```

Then, you can start defining your module:

```typescript
import { defineNovaModule } from "@gtc-nova/kit";

export const myModule = defineNovaModule({
  name: "my-module",
  features: {
    api: "api",
    hooks: "hooks",
  },
  pluginsDir: "./runtime/plugins",
  metaUrl: import.meta.url,
  hooks: [],
});
```

## Defining Features

Nova provides a flexible structure for organizing your module's features. Here's a generic example that can be adapted to various types of modules:

```typescript
export const moduleFeatures = {
  core: "core", // the default exports in these folders will be scanned
  othera: "other/a",
  otherb: "other/b",
} as const;

export type ModuleFeatures = typeof moduleFeatures;

export const genericModule = defineNovaModule<ModuleFeatures>({
  name: "generic-module",
  features: moduleFeatures,
  pluginsDir: "./runtime/plugins",
  metaUrl: import.meta.url,
});
```

## Creating Runtime Plugins

Nova allows you to define runtime plugins that extend the Nitro app. Here's an example of a plugin for a payment service:

```typescript
import { defineNovaPlugin } from "@gtc-nova/kit/runtime";

export default defineNovaPlugin({
  useRuntimeConfig,
  initialize: (nitro, config) => {
    // Initialize your service
    return {
      /* initialization data */
    };
  },
  before: async (nitro, initData) => {
    // Run setup before feature handlers are initialized
  },
  runtimeSetup: {
    transactions: {
      getVirtualHandlers: getVirtualTransactions,
      initFeatureHandlers: async (nitro, handlers) => {
        // Initialize transaction handlers
      },
    },
    // ... other features
  },
  after: (nitro, beforeData) => {
    console.log("Plugin initialized successfully");
  },
});
```

## Type Generation

Nova automatically generates types for your module, enhancing the end users experience who use your module. These types are generated based on the features you define.

Each module generates a single {module-name}.d.ts file that contains types for the modules features.

```typescript
import { Nitro, Serialize, Simplify } from "nitro/types";

declare module "@gtc-nova/kit" {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
  interface SubscriptionsHandlers {
    "/userNotifications": typeof import("../../nats/subscriptions/userNotifications.ts").default;
  }
  interface PublishersHandlers {
    "/userEvents": typeof import("../../nats/publishers/userEvents.ts").default;
  }
  interface NovaFeatures {
    nats: {
      subscriptions: SubscriptionsHandlers;
      publishers: PublishersHandlers;
    };
  }
}
```

You can use these types like this:

```typescript
import type { NovaFeatures } from "@gtc-nova/kit";

type MyType = NovaFeatures["nats"]["subscriptions"]["/userNotifications"];
```

## Short term roadmap

- ~~Move Plugin Lifecycle to hooks, remove old hooks code~~
- ~~Extend type generation for arbitrary imports and types~~
- Add support for custom hooks via the type generation
- Add metadata for features like nitro route meta
- ~~Abstract citty CLI to extend nitro CLI with custom commands~~
- Add module CLI injection
- Find better way to orchestrate plugins & modules
- open PR in nitro to help support/expand nitro/kit development
