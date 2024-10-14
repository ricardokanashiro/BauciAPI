async function createTables(pool) {
   try {
      await pool.query(`
         create table administradores (
            login varchar(30) not null,
            email varchar(50) not null,
            senha varchar(60) not null,
            nome varchar(40) not null,
   
            primary key (email, login)
         );
   
         create table categorias (
            ID varchar(20) not null,
            nome varchar(30) not null,
      
            primary key (ID)
         );
      
         create table produtos (
            categoriaID varchar(20) not null,
            imagem varchar(150),
            nome varchar(30) not null,
            descricao text not null,
            prazoMinimo smallint not null,
            prazoMaximo smallint not null,
            produtoID varchar(20) not null,
            
            primary key (produtoID),
            constraint fk_categoriaID_produto foreign key (categoriaID) references categorias (ID)
         );
      
         create table usuarios (
            nome varchar(40) not null,
            login varchar(40) not null,
            senha varchar(60) not null,
            categoriaID varchar(20) not null,
            ID varchar(20) not null,
      
            primary key (login),
            constraint fk_categoriaID_usuario foreign key (categoriaID) references categorias (ID)
         );
      `)
         .then(() => console.log("Tabelas criadas com sucesso"))

   } catch (error) {
      console.log("Erro ao criar tabelas: " + error.message)
   }
}

export { createTables }