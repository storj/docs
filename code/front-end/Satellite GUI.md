# Satellite GUI

Satellite GUI is a [vue.js](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/) front-end codebase that provides an UI interface for users to interact with the network.

## Development Workflow

There are two ways to start local development environment depending on what you need.

### Prerequisites

- Clone the [storj repo](https://github.com/storj/storj)
- Make sure you have both [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) installed
- Go to `web/satellite` folder
- run `npm install`. It will install all dependencies for the codebase

### Running without a back-end server

This is a good way to run it if you want to do UI development since it can do hot-reloading for the changes you make. However, you won't be able to get any necessary data from the back-end.

- Run `npm run serve` from `web/satellite` to start a development environment
- Visit `localhost:8080`

### Running with a back-end server

This way you will be able to test out how the back-end interacts with the front-end

- Make sure you have [storj-sim](https://github.com/storj/storj/wiki/Test-network) set up correctly
- If you want your local change to be reflected, run `npm run build` from `web/satellite`
- Run `storj-sim network setup` to set up the test network
- Run `storj-sim network run` to start the test network
- Visit `localhost:10002` to access the satellite GUI

### How to use `Vue development tool` when running with storj-sim

When running `npm run build`, the [vue-cli](https://cli.vuejs.org/) is running in `production` mode. Therefore, [vue development tool](https://github.com/vuejs/vue-devtools) is blocked in the browser. One way to enable it is to change the build flag in `web/satellite/package.json` from `--mode=production` to `--mode=development`. Then following the steps above(`Running with a back-end server` section), you will be able to use [vue development tool](https://github.com/vuejs/vue-devtools) in your browser.
