import 'dotenv/config';

/**  Carrega todas as variaveis de ambiente e coloca em uma global do
 *   node chamada process.e nv
 * */

import express from 'express';
import path from 'path';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

// import io from 'socket.io';
import http from 'http';

import cors from 'cors';

// import Youch from 'youch';
import routes from './routes';
// import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    // this.socket();

    this.middlewares();
    this.routes();

    // this.connectedUsers = {};
    // this.exceptionHandler();
  }

  // socket() {
  //   this.io = io(this.server);

  //   this.io.on('connection', socket => {
  //     const { petshop_id } = socket.handshake.query;

  //     this.connectedUsers[petshop_id] = socket.id;

  //     console.log(petshop_id);

  //     socket.on('disconnect', () => {
  //       delete this.connectedUsers[petshop_id];
  //       console.log('disconected');
  //     });
  //   });
  // }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uplodas'))
    );

    this.app.use((req, res, next) => {
      // req.io = this.io;
      req.connectedUsers = this.connectedUsers;
      next();
    });
  }

  routes() {
    this.app.use(routes);
    // this.app.use(Sentry.Handlers.errorHandler());
  }

  /**
   * Quando um mdw recebe 4 parametros o express entende que ele é
   * */

  // exceptionHandler() {
  //   this.app.use(async (err, req, res, next) => {
  //     if (process.env.NODE_ENV === 'development') {
  //       const errors = await new Youch(err, req).toJSON();

  //       return res.status(500).json(errors);
  //     }

  //     return res.status(500).json({ error: 'Internal server Error' });
  //   });
  // }
}

export default new App().server;
