import { v4 as uuidv4 } from "uuid"

class CategoriaService {

      constructor({ categoriaRepository, produtoRepository, usuarioRepository }) {
      this.categoriaRepository = categoriaRepository
      this.produtoRepoitory = produtoRepository
      this.usuarioRepository = usuarioRepository
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

      await this.categoriaRepository.createCategoria({nome, id})

      return await this.categoriaRepository.findAll()
   }

   async listAllCategorias(user) {

      if(user.role !== "adm" && user.role !== "user")
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

      await this.categoriaRepository.edit({nome, id})

      return await this.categoriaRepository.findAll()
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

      await this.produtoRepoitory.deleteByCategoriaID(id)
      await this.usuarioRepository.deleteByCategoriaId(id)
      await this.categoriaRepository.delete(id)

      return this.categoriaRepository.findAll()
   }

   async findCategoriaById({ id, user }) {

      if(user.role !== "adm")
      {
         throw new Error("Erro no Services: operação não permitida")
      }

      if(typeof id !== "string" || id.length === 0)
      {
         throw new Error("Erro no Services: id inválido!")
      }

      const categoria = await this.categoriaRepository.findById(id)

      return categoria
   }

}

export { CategoriaService }