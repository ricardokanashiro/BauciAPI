import { pool } from "../database/config.js"

class CategoriaRepository {
   
   async createCategoria({ id, nome }) {

      const query = `insert into categorias (ID, nome) values ($1, $2) returning *`

      try 
      {
         await pool.query(query, [id, nome])
      } 
      catch (error) 
      {
         throw new Error("Error on insert a categoria: " + error.message)
      }
      
   }

   async findByName(nome) {

      const query = `select * from categorias where nome = $1`

      try 
      {
         const { rows } = await pool.query(query, [nome])
         return rows[0]
      } 
      catch (error)
      {
         throw new Error("Erro ao selecionar categoria por nome: " + error.message)
      }
   }

   async findAll() {

      const query = `select * from categorias`

      try {
         const { rows } = await pool.query(query)
         return rows

      } catch (error) {
         throw new Error("Erro ao listar todas as categorias: " + error.message)
      }
   }

   async findById(id) {

      const query = `select * from categorias where id = $1`

      try 
      {
         const { rows } = await pool.query(query, [id])
         return rows[0]
      } 
      catch (error)
      {
         throw new Error("Erro ao buscar categoria pelo id: " + error.message)
      }
   }

   async edit({ nome, id }) {

      const query = `update categorias set nome = $1 where ID = $2`

      try 
      {
         await pool.query(query, [nome, id])
      } 
      catch (error) 
      {
         throw new Error("Erro ao editar categoria: " + error.message)
      }
      
   }

   async delete(id) {

      const query = `delete from categorias where ID = $1`

      try 
      {
         await pool.query(query, [id])
      } 
      catch (error)
      {
         throw new Error("Erro ao deletar uma categoria: " + error.message)
      }
   }
}

export { CategoriaRepository }