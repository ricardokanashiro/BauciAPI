class AdministradorController {

   constructor(administradorServices) {
      this.administradorServices = administradorServices
   }

   async loginAdministrador(req, res) {

      const { login, senha } = req.body

      try 
      {
         const token = await this.administradorServices
            .login({ login, senha })
            
         return res.status(200).json(token)
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }

   async validateAdministrador(req, res) {

      const { token } = req.body

      try
      {
         await this.administradorServices.validate(token)
         return res.status(200).json({ success: "Administrador logado com sucesso!" })
      }
      catch (error)
      {
         return res.status(500).json({ error: error.message })
      }
   }
}

export { AdministradorController }
