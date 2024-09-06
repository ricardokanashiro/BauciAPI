import { pool } from "../database/config.js"

class AdministradorRepository {

   async validateByCredentials({ login, senha }) {

      const query = `
         select exists (
            select 1 from administradores where login = $1 and senha = $2
         )
      `

      try 
      {
         const { rows } = await pool.query(query, [login, senha])
         return rows[0].exists
      } 
      catch (error) 
      {
         throw new Error("Erro no Repository: " + error.message)
      }
   }
}

export { AdministradorRepository }