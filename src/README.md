# Nova Framework for Nitro

Nova is a powerful and flexible framework for developing modules in the Nitro (by unjs) ecosystem. It provides a structured approach to creating, organizing, and managing Nitro modules with features like automatic plugin initialization, virtual file handling, and runtime setup. It's built ontop of defineNitroModule and defineNitroPlugin.

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Core Concepts](#core-concepts)
4. [API Reference](#api-reference)
5. [Advanced Usage](#advanced-usage)
6. [Contributing](#contributing)
7. [License](#license)

## Installation

To install Nova, use your preferred package manager:

```bash
npm install @your-org/nova-framework
# or
yarn add @your-org/nova-framework
# or
pnpm add @your-org/nova-framework
```

## Quick Start

Here's a basic example of how to use Nova to create a Nitro module:

```typescript
import { defineNovaModule } from "@your-org/nova-framework";

export default defineNovaModule({
  name: "my-module",
  features: {
    api: "api",
    routes: "routes",
  },
  pluginsDir: "plugins",
  metaUrl: import.meta.url,
});
```

This example creates a Nova module named "my-module" with two features: "api" and "routes". It also specifies a plugins directory and the module's meta URL.

## Core Concepts

### Modules

A Nova module is the main building block of your Nitro application. It encapsulates features, plugins, and runtime configurations.

### Features

Features are distinct functionalities within your module. They can represent different aspects of your application, such as API endpoints, routes, or custom logic.

### Plugins

Plugins are reusable pieces of code that can be automatically initialized and added to your Nitro application.

### Virtual Files

Nova uses a virtual file system to generate and manage dynamic content, such as feature handlers and runtime configurations.

## API Reference

### `defineNovaModule(options)`

Creates a new Nova module.

Parameters:

- `options`: An object with the following properties:
  - `name`: The name of the module (string)
  - `features`: An object mapping feature names to their corresponding directories
  - `pluginsDir`: (optional) The directory containing plugins
  - `utilsDir`: (optional) The directory containing utility functions
  - `metaUrl`: The `import.meta.url` of the module
  - `hooks`: (optional) An array of custom hooks

Returns: A Nitro module definition

### `defineNovaPlugin(options)`

Defines a Nova plugin for runtime configuration.

Parameters:

- `options`: An object with the following properties:
  - `initialize`: A function to initialize the plugin
  - `before`: A function to run before feature initialization
  - `after`: A function to run after feature initialization
  - `runtimeSetup`: (optional) An object containing runtime setup configurations for each feature

Returns: A Nitro plugin definition

## Advanced Usage

### Custom Hooks

You can define custom hooks for your Nova module:

```typescript
import { defineNovaModule } from "@your-org/nova-framework";

export default defineNovaModule({
  // ... other options
  hooks: [
    {
      name: "render:html",
      handler: (html) => {
        // Modify the HTML before rendering
        return html.replace(
          "</body>",
          '<script>console.log("Hello from Nova!")</script></body>'
        );
      },
    },
  ],
});
```

### Runtime Setup

For more complex modules, you can use the `defineNovaPlugin` function to set up runtime configurations:

```typescript
import { defineNovaPlugin } from "@your-org/nova-framework";

export default defineNovaPlugin({
  initialize: (nitro, config) => {
    // Perform initialization tasks
    return {
      /* initialization result */
    };
  },
  before: (nitro, initResult) => {
    // Run tasks before feature initialization
    return {
      /* before result */
    };
  },
  after: (nitro, beforeResult) => {
    // Run tasks after feature initialization
  },
  runtimeSetup: {
    api: {
      initFeatureHandlers: async (nitro, handlers) => {
        // Initialize API handlers
      },
      getVirtualHandlers: () => {
        // Return virtual handlers for the API feature
        return [
          /* handler definitions */
        ];
      },
    },
    // ... other features
  },
});
```
