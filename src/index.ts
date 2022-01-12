import express, { Request, Response, Application } from "express";
import Database from "better-sqlite3";

const db = new Database("apy.db", {});
const app: Application = express();
const PORT = process.env.PORT || 8000;

db.exec(
  "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, deposit REAL, customer_id INTEGER, interest_rate REAL, yearly_compound_times INTEGER, apy REAL,computed_total REAL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
);

//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

interface db {
  [key: string]: {
    apy: number;
    computed_total: number;
    deposit: number;
    interest_rate: number;
    yearly_compound_times: number;
  };
}

const customer_db: db = {};

/**
 *
 * @param r the interest rate
 * @param n number of times the interest is compounded per year
 * @returns number apy
 */
const computeApy = (r: number, n: number) => {
  const apy: number = ((1 + r / n) ** n - 1) * 100;
  return +apy.toFixed(4);
};

app.get("/api/v1/customers", (req: Request, res: Response): void => {
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
    const selectUserQuery = `SELECT * FROM users WHERE customer_id = ${id}`;

    const selectedUser = db.prepare(selectUserQuery).all();
    if (selectedUser.length === 0) {
      res.status(404).json({ message: "No history found for this customer" });
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
    }
    res.status(200).json({ message: "USer History deleted successfully" });
  }
);

app.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}/api/v1`);
});
