create table clientes (
    id int primary key not null auto_increment,
    nome varchar(255),
    email varchar(255),
    cpf varchar(11),
    celular varchar(11),
    endereco varchar(255)
);

create table livros (
    id int not null auto_increment primary key,
    nome varchar(255),
    autor varchar(255),
    ano varchar(4),
    estoque int
);

create table reservas (
    id int auto_increment not null primary key,
    cpf varchar(11),
    duracao int,
    livroid int,
    FOREIGN KEY (livroid) REFERENCES livros(id)
);