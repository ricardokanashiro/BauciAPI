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

}

export { CategoriaController }
