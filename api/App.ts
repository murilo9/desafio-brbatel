/* eslint-disable import/first */
// import * as mongoose from 'mongoose';
import cors = require('cors');
import express = require('express');
import bodyParser = require('body-parser');
import ProductRoutes from './routes/Product';

// const mongodbString = process.env.MONGODB_URI || 'mongodb://localhost/mydria';

export class App {
  public app: express.Application;
  // Declara todos os grupos de rotas:
  // public userRoutes: UserRoutes = new UserRoutes();

  constructor() {
    this.app = express();
    this.app.use(express.static('dist/pictures')); // Necessário para servir o pictures folder
    this.config();
    // Carrega todos os grupos de rotas:
    ProductRoutes.routes(this.app /* , verifyJWT */);
    // inicializa o banco de dados:
    // mongoose.connect(mongodbString, {useNewUrlParser: true});
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }
}

export default new App().app;
