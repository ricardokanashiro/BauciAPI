import { Router } from "express"

import { authMiddleware } from "../middlewares/authMiddleware.js"

import { UsuariosRepository } from "../repositories/usuariosRepository.js"
import { CategoriaRepository } from "../repositories/categoriaRepository.js"
import { UsuarioServices } from "../services/usuarioServices.js"
import { UsuarioController } from "../controllers/usuarioController.js"

const usuarioRouter = Router()

const usuarioRepository = new UsuariosRepository()
const categoriaRepository = new CategoriaRepository()
const usuarioServices = new UsuarioServices(usuarioRepository, categoriaRepository)
const usuarioController = new UsuarioController(usuarioServices)

usuarioRouter.get("/", authMiddleware, (req, res) => usuarioController.listAll(req, res))
usuarioRouter.post("/", authMiddleware, (req, res) => usuarioController.create(req, res))
usuarioRouter.put("/:id", authMiddleware, (req, res) => usuarioController.edit(req, res))
usuarioRouter.delete("/:id", authMiddleware, (req, res) => usuarioController.delete(req, res))

export { usuarioRouter }
