import { Request, Response } from 'express';
import express = require('express');
import { Product } from '../models/Product';

export default class ProductRoutes {
  /**
   * @desc Define as rotas para o recurso Product
   * @param app Objeto app do express
   */
  public static routes(app: express.Application /* ,verifyJWT */): void {
    app.get('/products', async (req: Request, res: Response) => {
      const products = await Product.findAll();
      res.status(200).send(products);
    });

    // POST

    // PUT

    // DELETE
  }
}
