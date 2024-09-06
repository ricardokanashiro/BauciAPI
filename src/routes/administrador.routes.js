import { Router } from "express"

import { AdministradorRepository } from "../repositories/administradorRepository.js"
import { AdministradorServices } from "../services/administradorServices.js"
import { AdministradorController } from "../controllers/administradorController.js"

const administradorRouter = Router()

const administradorRepository = new AdministradorRepository()
const administradorServices = new AdministradorServices(administradorRepository)
const administradorController = new AdministradorController(administradorServices)

administradorRouter.post("/", (req, res) => 
   administradorController.validateAdministrador(req,res)
)

export { administradorRouter }