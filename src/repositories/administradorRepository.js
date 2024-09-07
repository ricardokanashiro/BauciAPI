import { pool } from "../database/config.js"

class AdministradorRepository {

   async findByCredentials({ login, email }) {

      const query = `
         select * from administradores where login = $1 and email = $2
      `

      try 
      {
         const { rows } = await pool.query(query, [login, email])
         return rows[0]
      } 
      catch (error) 
      {
         throw new Error("Erro no Repository: " + error.message)
      }
   }
}

export { AdministradorRepository }