# Desafio BrBatel - CRUD Controle de Estoque

## Motivação


- A aplicação consiste num constrole de estoque simples. Para atender a demanda, esta aplicação
foi desenvolvida contendo o front-end e o back-end.

### Requisitos mínimos:

- O usuário pode cadastrar os produtos que ele tem em estoque, informando o nome do produto, a quantidade atual, quantidade mínima, o custo e o preço de revenda.
- Ele pode editar as informações do produto.
- Deve conter uma listagem dos produtos cadastrados, mostrando pelo menos o nome e a quantidade.
- Na listagem de cada linha, de cada produto, um botão para adicionar e subtrair da quantidade deste produto.
- Quando o produto estiver com a quantidade atual menor que a mínima, indicar na listagem.

### Características adicionais:

- Permitir o usuário adicionar imagem ao cadastro do produto.
- No rodapé da listagem há dois totalizadores, um para a quantidade total de produtos, e outro para o lucro bruto que é a receita total menos o custo total.
- Controle de acesso através de um login.
- Ser responsivo

### Tecnologias obrigatórias para o desenvolvimento do projeto:

- React JS
- Node Js
- PostgreSQL
- Git

### Outras tecnologias que foram utilizdas no desenvolvimento

- Express.js
- Typescript
- Sequelize

## Arquitetura

- O back-end consiste numa API REST, onde se pode interagir com os recursos realizando
requisições http na rota desejada utilizando o método adequado (GET, POST, PUT, DELETE).