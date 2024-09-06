import jwt from "jsonwebtoken"
import "dotenv/config.js"

class AdministradorServices {

   constructor(administradorRepository) {
      this.administradorRepository = administradorRepository
   }

   async validateByCredentials({ login, senha }) {
      
      if(typeof login !== "string" || login.length === 0) {
         throw new Error("Erro no Services: login do administrador inválido!")
      }

      if(typeof senha !== "string" || senha.length === 0) {
         throw new Error("Erro no Services: senha do administrador inválido!")
      }

      const admValidated = await this.administradorRepository
         .validateByCredentials({ login, senha })

      if(!admValidated) {
         throw new Error("Erro no Services: administrador inválido!")
      }

      const payload = {
         login,
         senha,
         role: "adm"
      }

      const options = {
         expiresIn: "14d"
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)
      
      return { token }
   }
}

export { AdministradorServices }
