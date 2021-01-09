import { Request, Response } from 'express';
import express = require('express');
import jwt = require('jsonwebtoken');

export default class LoginRoutes {
  public static routes(app: express.Application): void {
    // POST em /login - Realiza login e retorna um token de acesso

    app.post('/login', async (req: Request, res: Response) => {
      const { username, password } = req.body;
      // Se o login e a senha estiverem corretos
      if (username === process.env.USERNAME && password === process.env.PASSWORD) {
        const user = process.env.USERNAME;
        // Assinga o login (user) a este token
        const token = jwt.sign({ user }, process.env.SECRET, {
          expiresIn: 3600, // Session expira em 1 hora
        });
        res.status(200).send({ auth: true, token, user });
      } else { // Caso o usuário seja inválido
        res.status(400).send('Login ou senha inválidos.');
      }
    });
  }
}
