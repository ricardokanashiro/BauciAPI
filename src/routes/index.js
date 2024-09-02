import { Router } from "express"

import { categoriaRouter as categoriaRoutes } from "./categoria.routes.js"

export const router = Router()

router.use("/categoria", categoriaRoutes)