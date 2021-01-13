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
- Sequelize ORM

## Arquitetura

- O back-end consiste numa API REST, onde se pode interagir com os recursos realizando
requisições http na rota desejada utilizando o método adequado (GET, POST, PUT, DELETE).
- O front-end consiste numa aplicação SPA feita em React.js contendo uma página de login 
('/') e uma página de dashboard ('/dashboard') que exibe a itnerface do sistema de controle 
de estoque.
- O dashboard consiste numa barra horizontal no topo, uma tabela com a lsitagem de produtos,
um botão de adicionar produto e um indicador de estatísticas (total de produtos e lucro bruto).

### Organização de Componentes no React

```
App
  Login
  Dashboard
    ProductForm
    ProductItem...
```

### Rotas da API REST

- POST em '/login' - Realiza o login com base no usuário e senha enviados e retorna um 
token de acesso em caso de sucesso. A sessão expira em 1 hora. O token deve ser enviado 
no header 'x-access-header' nas demais requests, ou um status 400 é retornado.
Parâmetros:
```
{
  username: string,
  password: string
}
```
- GET em '/products' - Retorna um array contendo a lista de produtos cadastrados.
- POST em '/products' - Cadastra um produto. Retorna o produto recém-cadastrado.
Parâmetros:
```
{
  name: string,
  currentStock: number,
  minStock: number,
  cost: number,
  price: number,
  picture: string | null
}
```
- PUT em '/product/:productId' - Atualiza os dados de um produto com o ID correspondende 
a productId. Retorna o produto atualizado.
Parâmetros:
```
{
  name: string,
  currentStock: number,
  minStock: number,
  cost: number,
  price: number,
  picture: string | null
}
```
- PUT em '/product/:productId' - Exclui um produto com o ID correspondende 
a productId.
- POST em '/picture' - Faz upload de uma imagem pro servidor. Retorna a URL de acesso à imagem.

## Como testar localmente

- Instale as dependências da API Node rodando o comando **npm install** na pasta *api*, 
caso elas não estejam instaladas.
- Instale as dependências da aplicação React rodando o comando **npm install** na pasta 
*estoque-app*, caso elas não estejam instaladas.
- Crie um arquivo *.env* na pasta *api* no mesmo formato de *.env.example*, preenchendo-o 
adeuquadamente (sem os colchetes):
```
SECRET=[senha utilizada para criptografar os tokens JWT]
USERNAME=[nome de usuário utilizado para fazer login no sistema]
PASSWORD=[senha utilizada para fazer login no sistema]
DATABASE=[nome do banco de dados no Postgres utilizado pela aplicação]
DBUSER=[usuário do banco de dados no Postgres]
DBPASSWORD=[senha do banco de dados no Postgres]
```
- Faça o build da API Node caso não tenha feito, rodando o comando **npm run build** na pasta *api*.
- Inicie a API Node rodando o comando **npm run serve** na pasta *api*.
- Inicie a aplicação React rodando o comando **npm run start** na pasta *estoque-app*.