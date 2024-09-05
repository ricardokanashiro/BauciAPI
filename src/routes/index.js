import { Router } from "express"

import { categoriaRouter as categoriaRoutes } from "./categoria.routes.js"
import { produtoRouter as produtoRoutes } from "./produto.routes.js"

export const router = Router()

router.use("/categoria", categoriaRoutes)
router.use("/produto", produtoRoutes)