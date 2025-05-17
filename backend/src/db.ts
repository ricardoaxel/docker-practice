import pkg from "pg";
const { Pool } = pkg;
console.log("DBBBBBB DATABASE_URL in db.ts:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
