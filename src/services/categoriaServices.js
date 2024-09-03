import { v4 as uuidv4 } from "uuid"

class CategoriaService {

   constructor(categoriaRepository) {
      this.categoriaRepository = categoriaRepository
   }   

   async createCategoria(nome) {

      const id = uuidv4().substring(0, 20)

      if(!nome || typeof nome !== "string") {
         throw new Error("Nome inválido ao criar categoria!")
      }

      return await this.categoriaRepository.createCategoria({nome, id})
   }

   async listAllCategorias() {
      return await this.categoriaRepository.findAll()
   }

}

export { CategoriaService }