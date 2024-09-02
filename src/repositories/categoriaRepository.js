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
}

export { CategoriaRepository }