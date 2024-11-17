class UsuarioController {

   constructor(usuarioServices) {
      this.usuarioServices = usuarioServices
   }

   async create(req, res) {

      const { nome, login, senha, categoriaID } = req.body
      const { user } = req

      try 
      {
         const usuario = await this.usuarioServices.createUsuario({
            nome, login, senha, categoriaID, user
         })

         return res.status(200).json(usuario)
      } 
      catch (error)
      {
         return res.status(500).json({ error: error.message })
      }
   }

   async listAll(req, res) {

      const { user } = req

      try 
      {
         const usuarios = await this.usuarioServices.listAllUsuarios(user)
         
         return res.status(200).json(usuarios)
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }

   async edit(req, res) {

      const { id } = req.params
      const { login, senha, nome, categoriaId } = req.body
      const { user } = req

      try 
      {
         const usuarios = await this.usuarioServices.editUsuario({
            login, senha, nome, id, user, categoriaId
         })

         return res.status(200).json(usuarios)
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }

   async delete(req, res) {

      const { id } = req.params
      const { user } = req

      try 
      {
         const usuarios = await this.usuarioServices.deleteUsuario({ id, user })
         return res.status(200).json(usuarios)
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }

   async login(req, res) {

      const { login, senha } = req.body

      try 
      {
         const loginData = await this.usuarioServices.login({ login, senha })
         return res.status(200).json(loginData)
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }

   async validateToken(req, res) {

      const { token } = req.body

      try 
      {
         await this.usuarioServices.validateToken(token)
         return res.status(200).json({ success: "Token válido" })
      } 
      catch (error) 
      {
         return res.status(500).json({ error: "Token inválido: " + error.message })
      }
   }
}

export { UsuarioController }
