import { Router } from "express"

import { CategoriaRepository } from "../repositories/categoriaRepository.js"
import { CategoriaService } from "../services/categoriaServices.js"
import { CategoriaController } from "../controllers/categoriaControllers.js"

const categoriaRouter = Router()

const categoriaRepository = new CategoriaRepository()
const categoriaService = new CategoriaService(categoriaRepository)
const categoriaController = new CategoriaController(categoriaService)

categoriaRouter.get("/", (req, res) => categoriaController.listAllCategories(req, res))
categoriaRouter.post("/", (req, res) => categoriaController.createCategoria(req, res))
categoriaRouter.put("/:id", (req, res) => categoriaController.editCategoria(req, res))
categoriaRouter.delete("/:id", (req, res) => categoriaController.deleteCategoria(req, res))

export { categoriaRouter }