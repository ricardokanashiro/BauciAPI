import { Router } from "express"

import { categoriaRouter as categoriaRoutes } from "./categoria.routes.js"
import { produtoRouter as produtoRoutes } from "./produto.routes.js"
import { usuarioRouter as usuarioRoutes } from "./usuario.routes.js"
import { administradorRouter as administradorRoutes } from "./administrador.routes.js"

export const router = Router()

router.use("/categoria", categoriaRoutes)
router.use("/produto", produtoRoutes)
router.use("/usuario", usuarioRoutes)
router.use("/administrador", administradorRoutes)