class CategoriaController {

   constructor(categoriaService) {
      this.categoriaService = categoriaService
   }

   async createCategoria(req, res) {
      const { nome } = req.body

      try
      {
         const newCategoria = await this.categoriaService.createCategoria(nome)
         res.status(200).json(newCategoria)
      }
      catch (err)
      {
         res.status(500).json({ error: err.message })
      }
   }

   async listAllCategories(req, res) {

      try 
      {
         const allCategorias = await this.categoriaService.listAllCategorias()
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

      try 
      {
         const updatedCategoria = await this.categoriaService.editCategoria({ id, nome })
         res.status(200).json(updatedCategoria)
      } 
      catch (error)
      {
         res.status(500).json({ error: error.message })
      }

   }

}

export { CategoriaController }
