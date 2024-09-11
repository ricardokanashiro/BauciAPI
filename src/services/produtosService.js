import { v4 as uuidv4 } from "uuid"

class ProdutosService {

   constructor(produtosRespository, categoriaRepository) {
      this.produtosRespository = produtosRespository
      this.categoriaRepository = categoriaRepository
   }

   async createProduto({
      imagem, nome, descricao, prazoMinimo,
      prazoMaximo, categoriaID, user
   }) {
      if (user.role !== "adm") {
         throw new Error("Erro no Services: operação não permitida!")
      }

      const id = uuidv4().substring(0, 20)   
      const errorTemplate = "Falha ao criar produto: "

      const existingProduto = await this.produtosRespository.findByNome(nome)
      const existingCategoria = await this.categoriaRepository.findById(categoriaID)

      if (!existingCategoria) {
         throw new Error(errorTemplate + "categoria do produto não existe!")
      }

      if (existingProduto.length !== 0) {
         throw new Error(errorTemplate + "esse nome já existe!")
      }

      if (typeof nome !== "string" || nome.length <= 0) {
         throw new Error(errorTemplate + "nome inválido!")
      }

      if (descricao.length <= 0 || typeof descricao !== "string") {
         throw new Error(errorTemplate + "descrição inválida!")
      }

      if (prazoMinimo >= prazoMaximo) {
         throw new Error(errorTemplate + "intervalo de prazos inválido!")
      }

      if (typeof prazoMinimo !== "number" || prazoMinimo <= 0) {
         throw new Error(errorTemplate + "prazo mínimo inválido!")
      }

      if (typeof prazoMaximo !== "number" || prazoMaximo <= 0) {
         throw new Error(errorTemplate + "prazo máximo inválido!")
      }

      const newProduto = await this.produtosRespository.create({
         imageBuffer, nome, descricao, prazoMinimo,
         prazoMaximo, categoriaID, id
      })

      return newProduto
   }

   async listProdutosByCategoriaID({ categoriaID, user }) {

      if (user.role !== "adm") {
         throw new Error("Erro no Services: operação não permitida!")
      }

      const existingCategoria = await this.categoriaRepository.findById(categoriaID)

      if (!existingCategoria) {
         throw new Error("Erro ao listar produtos pelo ID da categoria: categoria não existe!")
      }

      const categorias = await this.produtosRespository.findByCategoriaID(categoriaID)

      return categorias
   }

   async editProduto({
      imagem, nome, descricao, user,
      prazoMinimo, prazoMaximo, id, categoriaID
   }) {
      if (user.role !== "adm") {
         throw new Error("Erro no Services: operação não permitida!")
      }

      const existingProduto = await this.produtosRespository.findByID(id)
      const imageBuffer = Buffer.from(imagem, "base64")
      const errorTemplate = "Erro ao editar um produto: "

      if (existingProduto.length === 0) {
         throw new Error(errorTemplate + "produto não existe!")
      }

      if (typeof nome !== "string" || nome.length <= 0) {
         throw new Error(errorTemplate + "nome inválido!")
      }

      if (descricao.length <= 0 || typeof descricao !== "string") {
         throw new Error(errorTemplate + "descrição inválida!")
      }

      if (prazoMinimo >= prazoMaximo) {
         throw new Error(errorTemplate + "intervalo de prazos inválido!")
      }

      if (typeof prazoMinimo !== "number" || prazoMinimo <= 0) {
         throw new Error(errorTemplate + "prazo mínimo inválido!")
      }

      if (typeof prazoMaximo !== "number" || prazoMaximo <= 0) {
         throw new Error(errorTemplate + "prazo máximo inválido!")
      }

      const editedProduto = await this.produtosRespository.edit({
         imageBuffer, nome, descricao, prazoMinimo,
         prazoMaximo, id, categoriaID
      })

      return editedProduto
   }

   async deleteProduto({ user, id }) {

      if(user.role !== "adm")
      {
         throw new Error("Erro no Services: operação não permitida!")
      }

      const existingProduto = await this.produtosRespository.findByID(id)

      if (existingProduto.length === 0) {
         throw new Error("Erro ao deletar um produto: produto não existe!")
      }

      await this.produtosRespository.delete(id)
   }
}

export { ProdutosService }
