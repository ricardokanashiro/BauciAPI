import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import "dotenv/config.js"

import { pool } from "./config.js"

const senhaEncrypt = bcrypt.hash(process.env.ADM_SENHA, 10)
const login = process.env.ADM_LOGIN
const email = process.env.ADM_EMAIL
const nome = process.env.ADM_NOME

try 
{
   await pool.query(`
      insert into administradores
         (login, email, senha, nome)
      values
       ($1, $2, $3, $4)
   `, [login, email, senhaEncrypt, nome])
   .then(() => console.log("Administrador criado com sucesso!"))
} 
catch (error) 
{
   console.log("Erro ao cadastrar administrador: " + error.message)
}