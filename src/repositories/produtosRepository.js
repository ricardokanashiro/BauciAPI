import { pool } from "../database/config.js"

class ProdutosRepository {

   async create({ 
      imagem, nome, descricao, prazoMinimo, 
      prazoMaximo, id
   }) 
   {
      const query = `
         insert into produtos 
            (imagem, nome, descricao, prazoMinimo, prazoMaximo, produtoID)
         values
            ($1, $2, $3, $4, $5, $6)
         returning *
      `

      try 
      {
         const { rows } = await pool.query(query, [
            imagem, nome, descricao, prazoMinimo, prazoMaximo, id
         ])

         return rows
      } 
      catch (error) 
      {
         throw new Error("Erro ao criar produto: " + error.message)
      }

   }

   async findByNome(nome) {

      const query = `select * from produtos where nome = $1`

      try 
      {
         const { rows } = await pool.query(query, [nome])
         return rows
      } 
      catch (error) 
      {
         throw new Error("Erro ao encontrar produto pelo nome: " + error.message)
      }
   }

   async findByCategoriaID(categoriaID) {

      const query = `select * from produtos where categoriaID = $1`

      try 
      {
         const { rows } = await pool.query(query, [categoriaID])
         return rows
      } 
      catch (error)
      {
         throw new Error("Erro ao encontrar produtos pela categoria: " + error.message)
      }
   }

   async findByID(id) {

      const query = `select * from produtos where produtoID = $1`

      try 
      {
         const { rows } = await pool.query(query, [id])
         return rows
      } 
      catch (error) 
      {
         throw new Error("Erro ao encontrar produto pelo id: " + error.message)
      }
   }

   async edit({ 
      imagem, nome, descricao, prazoMinimo, 
      prazoMaximo, id,
   }) 
   {

      const query = `
         update produtos set
            imagem = $1, nome = $2, descricao = $3, 
            prazoMinimo = $4, prazoMaximo = $5
         where
            produtoID = $6
         returning *
      `

      try 
      {
         const { rows } = await pool.query(query, [
            imagem, nome, descricao, prazoMinimo, prazoMaximo, id
         ])

         return rows
      } 
      catch (error) 
      {
         throw new Error("Erro ao editar um produto: " + error.message)
      }
   }

   async delete(id) {
      
      const query = `delete from produtos where produtoID = $1`

      try 
      {
         await pool.query(query, [id])
      } 
      catch (error) 
      {
         throw new Error("Erro ao deletar um produto: " + error.message)
      }
   }
}

export { ProdutosRepository }
