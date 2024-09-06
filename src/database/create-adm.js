import { v4 as uuidv4 } from "uuid"

import { pool } from "./config.js"

const id = uuidv4().substring(0, 20)

try 
{
   await pool.query(`
      insert into administradores
         (login, email, senha, nome, ID)
      values
       ('administrador@exemplo', 'email@exemplo.com', 'senha123', 'RicardaoDoZap', $1)
   `, [id])
   .then(() => console.log("Administrador criado com sucesso!"))
} 
catch (error) 
{
   console.log("Erro ao cadastrar administrador: " + error.message)
}