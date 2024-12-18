import express from "express"
import cors from "cors"

import { router as routes } from "./routes/index.js"

const app  = express()

app.use(cors({
   origin: ['http://localhost:5173', 'https://bauci-web.vercel.app', 'https://bauci-user-web.vercel.app'],
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.options('*', cors())

app.use(express.json())
app.use("/", routes)
app.use("/uploads", express.static("uploads"))

export { app }