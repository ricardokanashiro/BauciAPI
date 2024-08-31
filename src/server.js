import express from "express"

import { pool } from "./database/config.js"

const app  = express()

app.use(express.json())

app.get("/", (req, res) => {
   pool.query("create table produtos()")
   res.send("Hello World")
})

app.listen(3000, () => console.log("Server listening on port 3000"))