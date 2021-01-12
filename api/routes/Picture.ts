import { Response } from 'express';
import express = require('express');

export default class PictureRoutes {
  public static routes(app: express.Application, verifyJWT, upload): void {
    app.post('/picture', verifyJWT, upload.single('file'), (req: any, res: Response) => {
      res.status(200).send({
        name: req.imgId,
        extention: req.imgExtention,
      });
    });
  }
}
