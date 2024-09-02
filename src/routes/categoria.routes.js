import { Router } from "express"

import { CategoriaRepository } from "../repositories/categoriaRepository.js"
import { CategoriaService } from "../services/categoriaServices.js"
import { CategoriaController } from "../controllers/categoriaControllers.js"

const categoriaRouter = Router()

const categoriaRepository = new CategoriaRepository()
const categoriaService = new CategoriaService(categoriaRepository)
const categoriaController = new CategoriaController(categoriaService)

categoriaRouter.post("/", (req, res) => categoriaController.createCategoria(req, res))

export { categoriaRouter }