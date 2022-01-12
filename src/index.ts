import express, { Request, Response, Application } from "express";
import Database from "better-sqlite3";
import { computeApy } from "./helpers/helpers";
import { createUserTableIfNotExists, customer_db } from "./models/models";
import { dataCache, CACHE_TIME_TO_LEAVE } from "./cache/cache";

export const app: Application = express();
let PORT = process.env.PORT || 8000;

export let db = new Database("apy.db", {});

if (process.env.NODE_ENV === "test") {
  // make the app connect to the test database
  db = new Database("apy_test.db", {});
  PORT = 5055;
}

createUserTableIfNotExists(db);

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/v1/customers", (req: Request, res: Response): void => {
  // for my debugging purposes
  const userRecords = db.prepare("SELECT * FROM users").all();
  res.status(200).json(userRecords);
});

app.post(
  "/api/v1/customer/calculate-apy",
  (req: Request, res: Response): void => {
    const { deposit, customer_id, interest_rate, yearly_compound_times } =
      req.body;
    const apy = computeApy(+interest_rate, +yearly_compound_times);
    const computed_total = +deposit + apy;
    const customerId: string = customer_id;
    const customerDetails = {
      apy,
      computed_total,
      customer_id,
      deposit,
      interest_rate,
      yearly_compound_times,
    };
    db.prepare(
      `INSERT INTO users(deposit, customer_id, interest_rate,
        yearly_compound_times, apy, computed_total)
    VALUES(${deposit}, ${customer_id}, ${interest_rate},
        ${yearly_compound_times}, ${apy}, ${computed_total})`
    ).run();
    customer_db[customerId] = customerDetails;
    res.status(200).json(customerDetails);
  }
);

//get endpoint for a user history based on the customer id
app.get(
  "/api/v1/customer-apy-history/:id",
  (req: Request, res: Response): void => {
    const id = req.params.id;

    // return the cached data if it exists
    const cachedUserData = dataCache.get(id);
    if (cachedUserData) {
      res.status(200).json(cachedUserData);
      return;
    }
    // add cached user data
    const selectUserQuery = `SELECT * FROM users WHERE customer_id = ${id}`;
    const selectedUser = db.prepare(selectUserQuery).all();
    dataCache.set(id, selectedUser, CACHE_TIME_TO_LEAVE);

    if (selectedUser.length === 0) {
      res.status(404).json({ message: "No history found for this customer" });
      return;
    }
    res.status(200).json(selectedUser);
  }
);

app.delete(
  "/api/v1/customer-apy-history/:id",
  (req: Request, res: Response): void => {
    const id = req.params.id;

    const deleteUserSql = `DELETE FROM users WHERE customer_id = ${id}`;
    const returnedUser = db.prepare(deleteUserSql).run();
    if (returnedUser.changes === 0) {
      res.status(404).json({ message: "No history found for this customer" });
      return;
    }
    res.status(200).json({ message: "User History deleted successfully" });
  }
);

export const server = app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}/api/v1`);
});
