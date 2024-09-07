import { pool } from "../database/config.js"

class AdministradorRepository {

   async findByCredentials({ login }) {

      const query = `
         select * from administradores where login = $1
      `

      try 
      {
         const { rows } = await pool.query(query, [login])
         return rows[0]
      } 
      catch (error) 
      {
         throw new Error("Erro no Repository: " + error.message)
      }
   }
}

export { AdministradorRepository }