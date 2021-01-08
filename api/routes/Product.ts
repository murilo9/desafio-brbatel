import { Request, Response } from 'express';
import express = require('express');

export default class ProductRoutes {
  /**
   * @desc Define as rotas para o recurso Product
   * @param app Objeto app do express
   */
  public static routes(app: express.Application /* ,verifyJWT */): void {
    app.get('/test', async (req: Request, res: Response) => {
      res.status(200).send('Works!!!');
    });
  }
}
