import { Router } from "express"

import { ProdutosRepository } from "../repositories/produtosRepository.js"
import { ProdutosService } from "../services/produtosService.js"
import { CategoriaRepository } from "../repositories/categoriaRepository.js"
import { ProdutoController } from "../controllers/produtoController.js"

const produtoRouter = Router()

const produtosRespository = new ProdutosRepository()
const categoriaRepository = new CategoriaRepository()
const produtosService = new ProdutosService(produtosRespository, categoriaRepository)
const produtoController = new ProdutoController(produtosService)

produtoRouter.get("/:categoriaID", (req, res) => produtoController.listByCategoriaID(req, res))
produtoRouter.post("/", (req, res) => produtoController.create(req, res))
produtoRouter.put("/:id", (req, res) => produtoController.edit(req, res))
produtoRouter.delete("/:id", (req, res) => produtoController.delete(req, res))

export { produtoRouter }
