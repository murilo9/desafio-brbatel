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

    app.post('/products', async (req: Request, res: Response) => {
      const product = await Product.create(req.body);
      res.status(201).send(product);
    });

    app.put('/product/:productId', async (req: Request, res: Response) => {
      const produtcId = req.params.productId;
      const product = await Product.findByPk(produtcId);
      if (product) {
        for (const key in req.body) {
          console.log(`updating key: ${key}`);
          product[key] = req.body[key];
        }
        await product.save();
        res.status(200).send(product);
      } else {
        res.status(404).send('Produto não existente.');
      }
    });

    app.delete('/product/:productId', async (req: Request, res: Response) => {
      const produtcId = req.params.productId;
      const product = await Product.findByPk(produtcId);
      if (product) {
        await product.destroy();
        res.status(200).send('Produto excluído com sucesso.');
      } else {
        res.status(404).send('Produto não existente.');
      }
    });
  }
}
