class ProdutoController {

   constructor(produtoService) {
      this.produtoService = produtoService
   }

   async create(req, res) {

      const { nome, descricao, prazoMinimo, prazoMaximo, categoriaID } = req.body
      const { user } = req
      const imagem = req.file.filename

      try 
      {
         const newProduto = await this.produtoService.createProduto({
            nome, descricao, prazoMinimo, prazoMaximo, categoriaID, user, imagem
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
      const { user } = req

      try 
      {
         const produtos = await this.produtoService.listProdutosByCategoriaID({ categoriaID, user })

         return res.status(200).json(produtos)
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }

   async edit(req, res) {

      const { id } = req.params
      const { nome, descricao, prazoMinimo, prazoMaximo, categoriaID } = req.body
      const { user } = req
      const imagem = req.file.filename

      try 
      {
         const editedProduto = await this.produtoService.editProduto({
            id, nome, descricao, prazoMinimo, prazoMaximo, imagem, categoriaID, user
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
      const { user } = req

      try 
      {
         await this.produtoService.deleteProduto({ id, user })
         
         return res.status(200).json({ success: "produto excluído com sucesso!" })
      } 
      catch (error) 
      {
         return res.status(500).json({ error: error.message })
      }
   }
}

export { ProdutoController }
