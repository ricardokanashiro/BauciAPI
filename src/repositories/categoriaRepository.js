import { pool } from "../database/config.js"

class CategoriaRepository {
   
   async createCategoria({ id, nome }) {

      const query = `insert into categorias (ID, nome) values ($1, $2) returning *`

      try 
      {
         const newCategoria = await pool.query(query, [id, nome])

         return newCategoria
      } 
      catch (error) 
      {
         throw new Error("Error on insert a categoria: " + error.message)
      }
      
   }

   async findAll() {

      const query = `select * from categorias`

      try {
         return await pool.query(query) 
      } catch (error) {
         throw new Error("Erro ao listar todas as categorias: " + error.message)
      }
   }
}

export { CategoriaRepository }