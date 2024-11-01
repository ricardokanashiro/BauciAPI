import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import "dotenv/config.js"

class AdministradorServices {

   constructor(administradorRepository) {
      this.administradorRepository = administradorRepository
   }

   async login({ login, senha }) {
      
      if(typeof login !== "string" || login.length === 0) {
         throw new Error("Erro no Services: login do administrador inválido!")
      }

      if(typeof senha !== "string" || senha.length === 0) {
         throw new Error("Erro no Services: senha do administrador inválido!")
      }

      const adm = await this.administradorRepository
         .findByCredentials({ login })

      if(!adm || !await bcrypt.compare(senha, adm.senha)) {
         throw new Error("Erro no Services: erro ao encontrar administrador!")
      }

      const payload = {
         role: "adm"
      }

      const options = {
         expiresIn: "30d"
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options)
      
      return { token }
   }

   async validate(token) {

      if(typeof token !== "string" || token.length === 0) {
         throw new Error("Erro no Services: token do administrador inválido!")
      }

      try
      {
         jwt.verify(token, process.env.JWT_SECRET_KEY)
      }
      catch(err)
      {
         throw new Error("Erro no Services: " + err.message)
      }
   }
}

export { AdministradorServices }
