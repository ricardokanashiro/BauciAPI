class CategoriaController {

   constructor(categoriaService) {
      this.categoriaService = categoriaService
   }

   async createCategoria(req, res) {

      const { nome } = req.body
      const { user } = req

      try
      {
         const newCategoria = await this.categoriaService.createCategoria({ nome, user })
         res.status(200).json(newCategoria)
      }
      catch (err)
      {
         res.status(500).json({ error: err.message })
      }
   }

   async listAllCategories(req, res) {

      const { user } = req

      try 
      {
         const allCategorias = await this.categoriaService.listAllCategorias(user)
         res.status(200).json(allCategorias)
      } 
      catch (error) 
      {
         res.status(500).json({ error: error.message })
      }
   }

   async editCategoria(req, res) {

      const { id } = req.params
      const { nome } = req.body
      const { user } = req

      try 
      {
         const updatedCategoria = await this.categoriaService.editCategoria({ id, nome, user })
         res.status(200).json(updatedCategoria)
      } 
      catch (error)
      {
         res.status(500).json({ error: error.message })
      }

   }

   async deleteCategoria(req, res) {

      const { id } = req.params
      const { user } = req

      try 
      {
         await this.categoriaService.deleteCategoria({ id, user })
         res.status(200).json({ success: "Categoria deletada" })
      } 
      catch (error) 
      {
         res.status(500).json({ error: error.message })
      }
   }

}

export { CategoriaController }
