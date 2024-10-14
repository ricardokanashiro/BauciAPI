import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

class UsuarioServices {

   constructor(usuarioRepository, categoriaRepository) {
      this.usuarioRepository = usuarioRepository
      this.categoriaRepository = categoriaRepository
   }

   async createUsuario({
      login, senha, nome, categoriaID, user
   })
   {
      if(user.role !== "adm")
      {
         throw new Error("Erro no Services: operação não permitida!")
      }

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

   async listAllUsuarios(user) {

      if(user.role !== "adm")
      {
         throw new Error("Erro no Services: operação não permitida!")
      }

      const usuarios = await this.usuarioRepository.listAll()

      return usuarios
   }

   async editUsuario({ nome, login, senha, id, user }) {

      if(user.role !== "adm")
      {
         throw new Error("Erro no Services: operação não permitida!")
      }

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

   async deleteUsuario({ id, user }) {

      if(user.role !== "adm")
      {
         throw new Error("Erro no Services: operação não permitida!")
      }

      const existingUsuario = await this.usuarioRepository.findById(id)

      if(existingUsuario.length === 0) {
         throw new Error("Erro no Service de deletar o usuário: usuário não existente!")
      }

      await this.usuarioRepository.delete(id)
   }

   async login({ login, senha }) {

      const usuario = await this.usuarioRepository.findByLogin(login)
      const categoria = await this.categoriaRepository.findById(usuario.categoriaid)

      if(typeof login !== "string" || login.length === 0)
      {
         throw new Error("Erro no Services: usuário inválido!")
      }

      if(typeof senha !== "string" || senha.length === 0)
      {
         throw new Error("Erro no Services: senha inválida!")
      }

      if(!usuario || usuario.length === 0) 
      {
         throw new Error("Erro no Services: usuário não existe!")
      }

      bcrypt.compare(senha, usuario.senha, (err, result) => {

         if(err) throw new Error("Erro no Services: " + err.message)

         if(!result) throw new Error("Usuário não existe!")
      })

      const payload = { role: "user", categoriaID: usuario.categoriaID }
      const options = { expiresIn: "30d" }

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)

      return { token, login, nome: usuario.nome, categoria: categoria.nome }
   }

   async validateToken(token) {
      
      return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {

          if (err) {
            return reject(new Error("Erro ao validar token: " + err.message));
          }

          resolve()

        })

      })
    }
    
}

export { UsuarioServices }
