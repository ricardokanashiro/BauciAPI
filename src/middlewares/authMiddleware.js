import jwt from "jsonwebtoken"
import "dotenv/config.js"

function authMiddleware(req, res, next) {

   const authHeader = req.headers['authorization']
   const token = authHeader.split(" ")[1]

   if(!token) {
      res.status(500).json({
         error: "Erro de autenticação: faltando token!"
      })
   }

   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {

      if(err) {
         return res.status(500).json({ error: err.message })
      }

      req.user = user

      next()
   })
}

export { authMiddleware }
