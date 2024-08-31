import pg from "pg"

const { Pool } = pg

const pool = new Pool({
   host: "db",
   port: 5432,
   user: "amorzitos",
   password: "amorzinhalindona",
   database: "baucidb"
})

pool.on("connect", () => console.log("Database connection successful"))

export { pool }