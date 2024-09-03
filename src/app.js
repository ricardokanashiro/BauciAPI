import express from "express"

import { router as routes } from "./routes/index.js"

const app  = express()

app.use(express.json())
app.use("/", routes)

export { app }