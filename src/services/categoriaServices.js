import { v4 as uuidv4 } from "uuid"

class CategoriaService {

   constructor(categoriaRepository) {
      this.categoriaRepository = categoriaRepository
   }   

   async createCategoria({ nome, user }) {

      if(user.role !== "adm")
      {
         throw new Error("Erro no Services: operação não permitida!")
      }

      const id = uuidv4().substring(0, 20)
      const existingNome = await this.categoriaRepository.findByName(nome)

      if(!nome || typeof nome !== "string") {
         throw new Error("Nome inválido ao criar categoria!")
      }

      if(existingNome) {
         throw new Error("Nome já existente de categoria!")
      }

      return await this.categoriaRepository.createCategoria({nome, id})
   }

   async listAllCategorias(user) {

      if(user.role !== "adm" || user.role !== "user")
      {
         throw new Error("Erro no Services: operação não permitida!")
      }

      return await this.categoriaRepository.findAll()
   }

   async editCategoria({ id, nome, user }) {

      if(user.role !== "adm")
      {
         throw new Error("Erro no Services: operação não permitida!")
      }

      const existingCategoria = await this.categoriaRepository.findById(id)
      const existingNome = await this.categoriaRepository.findByName(nome)

      if(!existingCategoria) {
         throw new Error("Essa categoria não existe!")
      }

      if(!nome || typeof nome !== "string") {
         throw new Error("Nome inválido ao editar categoria!")
      }

      if(existingNome) {
         throw new Error("Nome já existente de categoria!")
      }

      return await this.categoriaRepository.edit({nome, id})
   }

   async deleteCategoria({ id, user }) {

      if(user.role !== "adm")
      {
         throw new Error("Erro no Services: operação não permitida!")
      }

      const existingCategoria = await this.categoriaRepository.findById(id)

      if(!existingCategoria) {
         throw new Error("Categoria não existente!")
      }

      await this.categoriaRepository.delete(id)
   }

}

export { CategoriaService }