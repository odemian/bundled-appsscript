# Bundle AppsScript
This repo contains a mock AppsScript project (packages/server) written in Typescript and bundled using Rollup (iife format).

### How it works
When server (gas) project is bundled it will generate a `packages/server/build/bundle.js` file containing bundled code and `packages/server/build/apis.json` file with a description of bundle (versions and exported APIs).

`apis.json` file is generated using a Rollup plugin `packages/server/plugins/createApiMap.js`. The plugin defines `generateBundle` hook, which allows to read all exported functions when bundle is generated.

When global build is executed (`scripts/build.js` or `yarn build:addon:dev`) it will build server (gas) package, copy it in the root build folder (`/build`) and run `scripts/createProxy.js -> createProxy` function, which will generate `build/apiProxy.js` file.

`apiProxy.js` file will be deployed to the AppsScript alongside with `bundle.js`. It contains all functions exported from `bundle.js` generated at global scope. These function will then delegate the execution to the bundle functions.