class UsuarioController {

   constructor(usuarioServices) {
      this.usuarioServices = usuarioServices
   }

   async create(req, res) {

      const { nome, login, senha, categoriaID } = req.body
      const { user } = req

      try 
      {
         const newUsuario = await this.usuarioServices.createUsuario({
            nome, login, senha, categoriaID, user
         })

         return res.status(200).json(newUsuario)
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
      const { login, senha, nome } = req.body
      const { user } = req

      try 
      {
         const editedUsuario = await this.usuarioServices.editUsuario({
            login, senha, nome, id, user
         })

         return res.status(200).json(editedUsuario)
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
         await this.usuarioServices.deleteUsuario({ id, user })
         return res.status(200).json({ success: "Usuário deletado com sucesso!" })
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
}

export { UsuarioController }
