# Satellite GUI

Satellite GUI is a [vue.js](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/) front-end codebase that provides an UI interface for users to interact with the network.

## Development Workflow

There are two ways to start local development environment depending on what you need.

### Prerequisites

- Clone the [storj repo](https://github.com/storj/storj)
- Make sure you have [Go](https://go.dev/doc/install), [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) installed
- From root folder run `go install ./...` to build back-end 
- Go to `web/satellite` folder
- run `npm install` or `npm ci`. It will install all dependencies for the codebase
- run `npm run wasm-dev`. It builds our WebAssembly module and places it into correct place. It is used to generate Access Grants.

### Running

This way you will be able to test out how the back-end interacts with the front-end

- If you want your local change to be reflected, run `npm run build` or `npm run dev` (hot reload) from `web/satellite`
- If you want to run test network with postgres DB make sure you have [storj-sim](https://github.com/storj/storj/wiki/Test-network) set up correctly
- If you want to run test network with cockroach DB please install prerequisites from link above and follow this guide
  [Running gateway-mt and linksharing locally using cockroach DB.](https://storjlabs.atlassian.net/wiki/spaces/ENG/pages/1587740718/Running+linksharing+locally)
  This guide also includes instructions to run object browser locally.
- Run `storj-sim network run` to start the test network
- Visit `localhost:10002` to access the satellite GUI

### How to use `Vue development tool` when running with storj-sim

Use `npm run dev` command.
