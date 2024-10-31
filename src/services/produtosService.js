import { v4 as uuidv4 } from "uuid"
import path from "path"
import fs from "fs/promises"

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
      const errors = []

      const existingProduto = await this.produtosRespository.findByNome(nome)
      const existingCategoria = await this.categoriaRepository.findById(categoriaID)

      prazoMinimo = Number(prazoMinimo)
      prazoMaximo = Number(prazoMaximo)

      if (!existingCategoria) {
         errors.push(errorTemplate + "categoria do produto não existe!")
      }

      if (existingProduto.length !== 0) {
         errors.push(errorTemplate + "esse nome já existe!")
      }

      if(typeof imagem !== "string" || imagem.length === 0 || !imagem) {
         errors.push(errorTemplate + "imagem inválida!")
      }

      if (typeof nome !== "string" || nome.length <= 0 || !nome) {
         errors.push(errorTemplate + "nome inválido!")
      }

      if (descricao.length <= 0 || typeof descricao !== "string" || !descricao) {
         errors.push(errorTemplate + "descrição inválida!")
      }

      if (typeof prazoMinimo !== "number" || prazoMinimo <= 0 || !prazoMinimo) {
         errors.push(errorTemplate + "prazo mínimo inválido!")
      }

      if (typeof prazoMaximo !== "number" || prazoMaximo <= 0 || !prazoMaximo) {
         errors.push(errorTemplate + "prazo máximo inválido!")
      }

      if (prazoMinimo >= prazoMaximo) {
         errors.push(errorTemplate + "intervalo de prazos inválido!")
      }

      if(errors.length > 0)
      {
         const deletingImgName = imagem.split("/").at(-1)

         await fs.unlink(path.join("/usr/app/uploads/", deletingImgName), (err) => {

            if(err){
               throw new Error("Erro ao deletar a imagem: " + err.message)
            }
         })

         throw new Error(errors.join(" "))
      }

      const newProduto = await this.produtosRespository.create({
         imagem, nome, descricao, prazoMinimo,
         prazoMaximo, categoriaID, id
      })

      return newProduto
   }

   async listProdutosByCategoriaID({ categoriaID, user }) {

      if (user.role !== "adm" && user.role !== "user") {
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
      const errorTemplate = "Erro ao editar um produto: "
      const errors = []

      prazoMinimo = Number(prazoMinimo)
      prazoMaximo = Number(prazoMaximo)

      if (existingProduto.length === 0) {
         errors.push(errorTemplate + "produto não existe!")
      }

      if (typeof nome !== "string" || nome.length <= 0 || !nome) {
         errors.push(errorTemplate + "nome inválido!")
      }

      if (descricao.length <= 0 || typeof descricao !== "string" || !descricao) {
         errors.push(errorTemplate + "descrição inválida!")
      }

      if (typeof prazoMinimo !== "number" || prazoMinimo <= 0 || !prazoMinimo) {
         errors.push(errorTemplate + "prazo mínimo inválido!")
      }

      if (typeof prazoMaximo !== "number" || prazoMaximo <= 0 || !prazoMaximo) {
         errors.push(errorTemplate + "prazo máximo inválido!")
      }

      if (prazoMinimo >= prazoMaximo) {
         errors.push(errorTemplate + "intervalo de prazos inválido!")
      }

      if(errors.length > 0) 
      {
         const deletingImgName = imagem[0].imagem.split("/").at(-1)

         await fs.unlink(path.join("/usr/app/uploads/", deletingImgName), (err) => {

            if(err){
               throw new Error("Erro ao deletar a imagem: " + err.message)
            }
         })

         throw new Error(errors.join(" "))
      }

      const imageName = existingProduto[0].imagem.split("/").at(-1)

      await fs.unlink(path.join("/usr/app/uploads/", imageName), (err) => {

         if(err){
            throw new Error("Erro ao deletar a imagem: " + err.message)
         }
      })

      const editedProduto = await this.produtosRespository.edit({
         imagem, nome, descricao, prazoMinimo,
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

      const imageName = existingProduto[0].imagem.split("/").at(-1)

      await fs.unlink(path.join("/usr/app/uploads/", imageName), (err) => {

         if(err){
            throw new Error("Erro ao deletar a imagem: " + err.message)
         }
      })

      await this.produtosRespository.delete(id)
   }
}

export { ProdutosService }
