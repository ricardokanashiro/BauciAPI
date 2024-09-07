import { Router } from "express"

import { authMiddleware } from "../middlewares/authMiddleware.js"

import { ProdutosRepository } from "../repositories/produtosRepository.js"
import { ProdutosService } from "../services/produtosService.js"
import { CategoriaRepository } from "../repositories/categoriaRepository.js"
import { ProdutoController } from "../controllers/produtoController.js"

const produtoRouter = Router()

const produtosRespository = new ProdutosRepository()
const categoriaRepository = new CategoriaRepository()
const produtosService = new ProdutosService(produtosRespository, categoriaRepository)
const produtoController = new ProdutoController(produtosService)

produtoRouter.get("/:categoriaID", authMiddleware, (req, res) => 
   produtoController.listByCategoriaID(req, res)
)

produtoRouter.post("/", authMiddleware, (req, res) => produtoController.create(req, res))
produtoRouter.put("/:id", authMiddleware, (req, res) => produtoController.edit(req, res))
produtoRouter.delete("/:id", authMiddleware, (req, res) => produtoController.delete(req, res))

export { produtoRouter }
