import { Sequelize } from 'sequelize-typescript';
import cors = require('cors');
import express = require('express');
import bodyParser = require('body-parser');
import multer = require('multer');
import verifyJWT from './middleware/Auth';
// Import das rotas
import ProductRoutes from './routes/Product';
import LoginRoutes from './routes/Login';
import PictureRoutes from './routes/Picture';
import storage from './middleware/FileUpload';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    // Necessário para servir o diretório pictures
    this.app.use('/pictures', express.static('dist/pictures'));
    // Configura o App do express
    this.config();
    // Inicializa o multer uploader
    const upload = multer({ storage });
    // Carrega todos os grupos de rotas:
    ProductRoutes.routes(this.app, verifyJWT);
    LoginRoutes.routes(this.app);
    PictureRoutes.routes(this.app, verifyJWT, upload);
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
