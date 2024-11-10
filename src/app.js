import express from "express"
import cors from "cors"

import { router as routes } from "./routes/index.js"

const app  = express()

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use("/", routes)
app.use("/uploads", express.static("uploads"))

export { app }