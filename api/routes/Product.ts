import { Request, Response } from 'express';
import express = require('express');
import { Product } from '../models/Product';

export default class ProductRoutes {
  /**
   * @desc Define as rotas para o recurso Product
   * @param app Objeto app do express
   */
  public static routes(app: express.Application, verifyJWT): void {
    app.route('/products')
      /**
       * Insere o middleware de autenticação (JWT) para todos os métodos na rota /products.
       */
      .all((req: Request, res: Response, next) => {
        verifyJWT(req, res, () => { next(); });
      })

      .get(async (req: Request, res: Response) => {
        const products = await Product.findAll();
        res.status(200).send(products);
      })

      .post(async (req: Request, res: Response) => {
        const product = await Product.create(req.body);
        res.status(201).send(product);
      });

    app.route('/product/:productId')
      /**
       * Insere o middleware de autenticação (JWT) para todos os métodos
       * na rota /product/:productId.
       */
      .all((req: Request, res: Response, next) => {
        verifyJWT(req, res, () => { next(); });
      })

      .put(async (req: Request, res: Response) => {
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
      })

      .delete(async (req: Request, res: Response) => {
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
