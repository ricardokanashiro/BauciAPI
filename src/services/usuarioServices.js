import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"

class UsuarioServices {

   constructor(usuarioRepository, categoriaRepository) {
      this.usuarioRepository = usuarioRepository
      this.categoriaRepository = categoriaRepository
   }

   async createUsuario({
      login, senha, nome, categoriaID
   })
   {
      const id = uuidv4().substring(0, 20)
      const errorTemplate = "Erro no Service de criar usuário: "
      const existingCategoria = await this.categoriaRepository.findById(categoriaID)

      if(existingCategoria === 0) {
         throw new Error(errorTemplate + "Categoria do usuário não existente!")
      }

      if(typeof login !== "string" || login.length === 0) {
         throw new Error(errorTemplate + "Login de usuário inválido!")
      }

      if(login.length > 40) {
         throw new Error(errorTemplate + "Login de usuário excede o limite de caracteres!")
      }

      if(typeof senha !== "string" || senha.length === 0) {
         throw new Error(errorTemplate + "Senha de usuário inválido")
      }

      if(senha.length > 30) {
         throw new Error(errorTemplate + "Senha de usuário excede o limite de caracteres!")
      }

      const senhaIncrypt = await bcrypt.hash(senha, 10)

      if(typeof nome !== "string" || nome.length === 0) {
         throw new Error(errorTemplate + "Senha de usuário inválido")
      }

      if(nome.length > 40) {
         throw new Error(errorTemplate + "Nome de usuário excede o limite de caracteres!")
      }

      const newUsuario = await this.usuarioRepository.create({
         login, senhaIncrypt, nome, categoriaID, id
      })

      return newUsuario
   }

   async listAllUsuarios() {

      const usuarios = await this.usuarioRepository.listAll()

      return usuarios
   }

   async editUsuario({ nome, login, senha, id }) {

      const errorTemplate = "Erro no Services de editar o usuário: "

      if(typeof login !== "string" || login.length === 0) {
         throw new Error(errorTemplate + "Login de usuário inválido!")
      }

      if(login.length > 40) {
         throw new Error(errorTemplate + "Login de usuário excede o limite de caracteres!")
      }

      if(typeof senha !== "string" || senha.length === 0) {
         throw new Error(errorTemplate + "Senha de usuário inválido")
      }

      if(senha.length > 30) {
         throw new Error(errorTemplate + "Senha de usuário excede o limite de caracteres!")
      }

      const salts = await bcrypt.genSalt(10)
      const senhaEncrypt = await bcrypt.hash(senha, salts)

      if(typeof nome !== "string" || nome.length === 0) {
         throw new Error(errorTemplate + "Senha de usuário inválido")
      }

      if(nome.length > 40) {
         throw new Error(errorTemplate + "Nome de usuário excede o limite de caracteres!")
      }

      const editedUsuario = await this.usuarioRepository.edit({
         nome, login, senhaEncrypt, id
      })

      return editedUsuario
   }

   async deleteUsuario(id) {

      const existingUsuario = await this.usuarioRepository.findById(id)

      if(existingUsuario.length === 0) {
         throw new Error("Erro no Service de deletar o usuário: usuário não existente!")
      }

      await this.usuarioRepository.delete(id)
   }
}

export { UsuarioServices }
