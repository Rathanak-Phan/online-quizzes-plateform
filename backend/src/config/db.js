import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

let pool;

if (process.env.NODE_ENV === "production") {
  // Production on Render
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // required by Render
  });
} else {
  // Local development
  pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
    ssl: false // local PostgreSQL usually does not use SSL
  });
}

export const db = pool;
