import pg from "pg"
import 'dotenv/config'

const { Pool } = pg

const pool = new Pool({
   host: process.env.POSTGRES_HOST,
   port: process.env.POSTGRES_PORT,
   user: process.env.POSTGRES_USER,
   password: process.env.POSTGRES_PASSWORD,
   database: process.env.POSTGRES_DB,
   ssl: { rejectUnauthorized: false }
})

pool.on("connect", () => console.log("Database connection successful"))

export { pool }