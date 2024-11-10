import { Router } from "express"

import { authMiddleware } from "../middlewares/authMiddleware.js"

import { ProdutosRepository } from "../repositories/produtosRepository.js"
import { CategoriaRepository } from "../repositories/categoriaRepository.js"
import { CategoriaService } from "../services/categoriaServices.js"
import { CategoriaController } from "../controllers/categoriaControllers.js"


const categoriaRouter = Router()

const produtoRepository = new ProdutosRepository()

const categoriaRepository = new CategoriaRepository()
const categoriaService = new CategoriaService({ categoriaRepository, produtoRepository })
const categoriaController = new CategoriaController(categoriaService)


categoriaRouter.get("/", authMiddleware, (req, res) => 
   categoriaController.listAllCategories(req, res)
)

categoriaRouter.post("/", authMiddleware, (req, res) => 
   categoriaController.createCategoria(req, res)
)

categoriaRouter.put("/:id", authMiddleware, (req, res) => 
   categoriaController.editCategoria(req, res)
)

categoriaRouter.delete("/:id", authMiddleware, (req, res) => 
   categoriaController.deleteCategoria(req, res)
)

categoriaRouter.get("/:id", authMiddleware, (req, res) => 
   categoriaController.findCategoriaById(req, res)
)

export { categoriaRouter }