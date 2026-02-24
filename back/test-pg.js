import pkg from "pg";
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config();

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("Node connected to Neon!");
    const res = await client.query('SELECT 1 AS test');
    console.log(res.rows);
    await client.end();
  } catch (err) {
    console.error("Node connection failed:", err);
  }
}

testConnection();
