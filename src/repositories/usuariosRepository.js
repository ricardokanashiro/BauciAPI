import { pool } from "../database/config.js"

class UsuariosRepository {

   async create({ login, senhaIncrypt, nome, categoriaID, id, categoria }) {

      const query = `
         insert into usuarios 
            (login, senha, nome, categoriaID, ID, categoria)
         values 
            ($1, $2, $3, $4, $5, $6)
         returning *
      `

      try {
         await pool.query(query, [login, senhaIncrypt, nome, categoriaID, id, categoria])
      }
      catch (error) {
         throw new Error("Erro ao criar um usuário: " + error.message)
      }
   }

   async findByNome(nome) {

      const query = `select * from usuarios where nome = $1`

      try {
         const { rows } = await pool.query(query, [nome])

         return rows
      }
      catch (error) {
         throw new Error("Erro ao encontrar um usuário pelo nome: " + error.message)
      }
   }

   async listAll() {

      const query = `select * from usuarios`

      try {
         const { rows } = await pool.query(query)

         return rows
      }
      catch (error) {
         throw new Error("Erro ao listar os usuários: " + error.message)
      }
   }

   async findById(id) {

      const query = `select * from usuarios where ID = $1`

      try 
      {
         const { rows } = await pool.query(query, [id])

         return rows
      }
      catch (error) 
      {
         throw new Error("Erro ao encontrar usuário pelo ID: " + error.message)
      }
   }

   async edit({ nome, login, senhaEncrypt, id, categoriaId, categoriaNome }) {

      const query = `
         update usuarios 
            set nome = $1, login = $2, senha = $3, categoriaID = $4, categoria = $5
            where id = $6
      `

      try 
      {
         await pool.query(query, [nome, login, senhaEncrypt, categoriaId, categoriaNome, id])
      } 
      catch (error) 
      {
         throw new Error("Erro ao editar um usuário: " + error.message)
      }
   }

   async delete(id) {

      const query = `delete from usuarios where ID = $1`

      try 
      {
         await pool.query(query, [id]) 
      } 
      catch (error) 
      {
         throw new Error("Erro ao deletar um usuário: " + error.message)
      }
   }

   async deleteByCategoriaId(id) {

      const query = `delete from usuarios where categoriaID = $1`

      try 
      {
         await pool.query(query, [id])   
      } 
      catch (error) {
         throw new Error("Erro ao deletar usuários: " + error.message)
      }
   }

   async findByLogin(login) {

      const query = `select * from usuarios where login = $1`

      try 
      {
         const { rows } = await pool.query(query, [login])
         return rows[0]
      } 
      catch (error) 
      {
         throw new Error("Erro ao buscar usuário pelas credenciais: " + error.message)
      }
   }
}

export { UsuariosRepository }