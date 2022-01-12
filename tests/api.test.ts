import { app, server, db } from "../src/index";
import request from "supertest";

beforeAll(() => {});

afterAll(() => {
  server.close();
  db.close();
});

describe("POST /api/v1/customer/calculate-apy", function () {
  it("responds with json", function (done) {
    request(app)
      .post("/api/v1/customer/calculate-apy")
      .send({
        deposit: "400",
        customer_id: "2",
        interest_rate: "0.05",
        yearly_compound_times: "12",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET with a user based the user id /api/v1/customers/2", function () {
  it("responds with json", function (done) {
    request(app)
      .get("/api/v1/customer-apy-history/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET all the users saved in the db /api/v1/customers", function () {
  it("responds with json", function (done) {
    request(app)
      .get("/api/v1/customers")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("DELETE a user with the user details /api/v1/customer-apy-history/2", function () {
  it("responds with json", function (done) {
    request(app)
      .delete("/api/v1/customer-apy-history/2")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
