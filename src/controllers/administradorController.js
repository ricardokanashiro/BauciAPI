class AdministradorController {

   constructor(administradorServices) {
      this.administradorServices = administradorServices
   }

   async validateAdministrador(req, res) {

      const { login, senha, email } = req.body

      try 
      {
         const token = await this.administradorServices
            .validateByCredentials({ login, senha, email })
            
         return res.status(200).json(token)
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }
}

export { AdministradorController }
