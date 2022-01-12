export interface databaseInterface {
  exec: (sql: string) => void;
  prepare: (sql: string) => void;
}

/**
 *  creates the user table if it doesn't exist
 * @returns {void}
 * */
export const createUserTableIfNotExists = (db: databaseInterface): void => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, deposit REAL, customer_id INTEGER, interest_rate REAL, yearly_compound_times INTEGER, apy REAL,computed_total REAL, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)"
  );
};

interface db {
  [key: string]: {
    apy: number;
    computed_total: number;
    deposit: number;
    interest_rate: number;
    yearly_compound_times: number;
  };
}

export const customer_db: db = {};
