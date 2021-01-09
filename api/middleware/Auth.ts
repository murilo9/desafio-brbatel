/* eslint-disable consistent-return */
require('dotenv-safe').config();

import jwt = require('jsonwebtoken');

export default (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401)
      .send({ auth: false, message: 'O token não foi providenciado' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        auth: false,
        message: 'Failed to authenticate token.',
      });
    }
    // Se tudo estiver ok, salva no request para uso posterior:
    req.requesterId = decoded.id;
    next();
  });
};
