import { Sequelize } from 'sequelize-typescript';
import cors = require('cors');
import express = require('express');
import bodyParser = require('body-parser');
import verifyJWT from './middleware/Auth';
import ProductRoutes from './routes/Product';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    // Necessário para servir o diretório pictures
    this.app.use(express.static('dist/pictures'));
    // Necessário para servir o diretório tmp
    this.app.use(express.static('dist/tmp'));
    // Configura o App do express
    this.config();
    // Carrega todos os grupos de rotas:
    ProductRoutes.routes(this.app, verifyJWT);
    // Inicializa o banco de dados:
    const sequelize = new Sequelize({
      database: 'brbatel',
      dialect: 'postgres',
      username: 'murilo',
      password: '000000',
      models: [`${__dirname}/models`], // or [Player, Team],
    });
    // Atualiza o banco de dados (cria as tabelas que não existirem)
    sequelize.sync({ force: true });
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
}

export default new App().app;
