class ProdutoController {

   constructor(produtoService) {
      this.produtoService = produtoService
   }

   async create(req, res) {

      const { nome, descricao, prazoMinimo, prazoMaximo, categoriaID } = req.body

      try 
      {
         const newProduto = await this.produtoService.createProduto({
            nome, descricao, prazoMinimo, prazoMaximo, categoriaID
         })

         return res.status(200).json(newProduto)
      } 
      catch (error)
      {
         res.status(500).json({ error: error.message })
      }
   } 

   async listByCategoriaID(req, res) {
      
      const { categoriaID } = req.params

      try 
      {
         const produtos = await this.produtoService.listProdutosByCategoriaID(categoriaID)

         return res.status(200).json(produtos)
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }

   async edit(req, res) {

      const { id } = req.params
      const { nome, descricao, prazoMinimo, prazoMaximo, imagem, categoriaID } = req.body

      try 
      {
         const editedProduto = await this.produtoService.editProduto({
            id, nome, descricao, prazoMinimo, prazoMaximo, imagem, categoriaID
         })

         return res.status(200).json(editedProduto)
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
         await this.produtoService.deleteProduto(id)
         
         return res.status(200).json({ success: "produto excluído com sucesso!" })
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }
}

export { ProdutoController }
