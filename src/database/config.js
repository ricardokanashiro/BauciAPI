import pg from "pg"
import 'dotenv/config'

import { createAdmTable } from "./create-adm.js"
import { createTables } from "./create-tables.js"

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

const { rows: admAlreadyExists } = await pool.query("select * from administradores")

if(admAlreadyExists.length === 0) {
   await createTables(pool)
   await createAdmTable(pool)
}


export { pool }