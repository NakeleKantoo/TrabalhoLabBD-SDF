## Tables:
Controle de vendas e estoque simples

### usuarios

| id                             | nome         | email        | senha        |
| ------------------------------ | ------------ | ------------ | ------------ |
| int PK auto_increment not null | varchar(255) | varchar(255) | varchar(255) |

### vendas

| id                             | prodID         | quantidade | vendedorID   |
| ------------------------------ | -------------- | ---------- | ------------ |
| int PK auto_increment not null | int foreignkey | int        | int not null |

### produtos

| id                             | estoque | preco |
| ------------------------------ | ------- | ----- |
| int PK auto_increment not null | int     | int   |

Obs.: o preço é guardado \*100, ou seja, 1000 seria R$10,00 e 1050 seria R$10,50