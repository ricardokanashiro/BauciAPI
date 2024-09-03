import { pool } from "../database/config.js"

class CategoriaRepository {
   
   async createCategoria({ id, nome }) {

      const query = `insert into categorias (ID, nome) values ($1, $2) returning *`

      try 
      {
         const { rows } = await pool.query(query, [id, nome])

         return rows[0]
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
}

export { CategoriaRepository }