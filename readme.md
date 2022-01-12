# Oparetor Api

A simple api that enables a user to calculate the apy for some cash deposit.

## Tech Stack used

- [x] Language: TypeScript/Js (Node js)
- [x] Path: src/index.ts

## Features.

- [x] Calculate the user apy for a given cash deposit and store it in a sql lite db.
- [x] Delete the customer history given an id.
- [x] View the particular details of a customer.
- [x] View all the customers stored on the api.

## How to set up the dev environment.

- Clone the repository
- Run `npm install` or `yarn`.
- Run `npm run dev` or `yarn dev`.
- The app will open up locally on `http://localhost:8000/:`.

## How to run the tests.

- Run `npm run test` or `yarn test`.

## API Endpoints

```
POST /api/v1/customers

{
    "deposit":"200",
    "customer_id":"2",
    "interest_rate":"0.05",
    "yearly_compound_times":"12"

}
```

```
GET /api/v1/customer-apy-history/:id

 [
    {
        "id": 4,
        "deposit": 200,
        "customer_id": 2,
        "interest_rate": 0.05,
        "yearly_compound_times": 12,
        "apy": 5.1162,
        "computed_total": 205.1162,
        "created_at": "2022-01-12 16:37:19"
    }
]
```

```
GET /api/v1/customers

[
    {
        "id": 1,
        "deposit": 100,
        "customer_id": 1,
        "interest_rate": 0.05,
        "yearly_compound_times": 12,
        "apy": 5.1162,
        "computed_total": 105.1162,
        "created_at": "2022-01-12 16:35:28"
    },
    {
        "id": 2,
        "deposit": 100,
        "customer_id": 1,
        "interest_rate": 0.05,
        "yearly_compound_times": 12,
        "apy": 5.1162,
        "computed_total": 105.1162,
        "created_at": "2022-01-12 16:36:54"
    },
    {
        "id": 3,
        "deposit": 100,
        "customer_id": 1,
        "interest_rate": 0.05,
        "yearly_compound_times": 12,
        "apy": 5.1162,
        "computed_total": 105.1162,
        "created_at": "2022-01-12 16:37:08"
    },
]

```

```
DELETE /api/v1/customer-apy-history/:id

{
    "message": "User History deleted successfully"
}

```

## Dependencies

- [express](http://expressjs.com/)
- [better-sqlite3](https://www.npmjs.com/package/better-sqlite3)
- [typescript](https://typescript.org/)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)

## Reasons why some technologies were used.

- #### Node cache

  - Node cache is easy to use and it is very fast i.e it provides a very simple in memory db to cache values.
  - it has less configurations as compare to other caching libraries
  - Node cache doesn't have any dependency.
  - Node cache does't require setup as compared to redis.

- #### Prefered Testing Suite (Jest and SuperTest).
  - Jest is a test runner that runs your tests in a Node.js environment and it also implements BDD which makes the grouping and describing tests really easy.
  - SuperTest is a good choice for testing because it is very easy to use and supports other testing frameworks, it also provides a very simple api to interact with while writing tests.
  - Super Test provides a test agent which can be used to test out the api methods for any provided endpoints.
  - Both provide very good developer documentation which is easy to understand.

N.B. The app is built and tested on windows but should work fine with both mac os and linux since the packages used are not platform specific.
