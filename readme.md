# Oparetor Api

A simple api that enables a user to calculate the apy for some cash deposit.

## Tech Stack used

- [x] Language: TypeScript/Js (Node js)
- [x] Path: src/index.ts

## Features.

- [x] Calculate the user apy for a given cash deposit and store it in a sql lite db.
- [x] Delete the customer history.
- [x] View a particular the customer details.
- [x] View all the customers stored in the api.

## How to set up the dev environment.

- Clone the repository
- Run `npm install` or `yarn`
- Run `npm run dev` or `yarn dev`
- The app will open up locally on `http://localhost:8000/:`.

## API Endpoints

- [x] GET /api/v1/customers
- [x] GET /api/v1/customer-apy-history/:id
- [x] POST /api/v1/cusomer/calculate-apy
- [x] DELETE /api/v1/customer-apy-history/:id

## Dependencies

- [express](http://expressjs.com/)
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3)
- [typescript](https://typescript.org/)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

N.B. The app is built and tested on windows but should work fine with both mac os and linux
