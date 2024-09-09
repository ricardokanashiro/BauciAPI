import { Router } from "express"

import { authMiddleware } from "../middlewares/authMiddleware.js"

import { CategoriaRepository } from "../repositories/categoriaRepository.js"
import { CategoriaService } from "../services/categoriaServices.js"
import { CategoriaController } from "../controllers/categoriaControllers.js"

const categoriaRouter = Router()

const categoriaRepository = new CategoriaRepository()
const categoriaService = new CategoriaService(categoriaRepository)
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