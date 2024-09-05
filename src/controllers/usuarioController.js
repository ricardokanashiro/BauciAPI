class UsuarioController {

   constructor(usuarioServices) {
      this.usuarioServices = usuarioServices
   }

   async create(req, res) {

      const { nome, login, senha, categoriaID } = req.body

      try 
      {
         const newUsuario = await this.usuarioServices.createUsuario({
            nome, login, senha, categoriaID
         })

         return res.status(200).json(newUsuario)
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }

   async listAll(req, res) {

      try 
      {
         const usuarios = await this.usuarioServices.listAllUsuarios()
         
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

      try 
      {
         const editedUsuario = await this.usuarioServices.editUsuario({
            id, login, senha, nome
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

      try 
      {
         await this.usuarioServices.deleteUsuario(id)
         return res.status(200).json({ success: "Usuário deletado com sucesso!" })   
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }
}

export { UsuarioController }
