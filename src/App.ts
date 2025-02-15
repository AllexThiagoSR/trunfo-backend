import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import APIError from './utils/ApiError';
import indexRouter from './router';
import sequelizeConnection from './database/config/database';
import Card from './database/models/Card.model';
import Deck from './database/models/Deck.model';
import User from './database/models/User.model';
import Rarity from './database/models/Rarity.model';

export default class App {
  public server: express.Express;

  constructor(server: express.Express = express()) {
    this.server = server;
    this.config();
    this.routes();
  }

  private config() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(helmet())
  }

  private routes() {
    this.server.get('/check', async (_req: Request, res: Response) => {
      try {
        await sequelizeConnection.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      res.json({ message: 'API is running' });
      return;
    });

    this.server.use(indexRouter)

    this.server.use((err: APIError, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.log(err);
      if (err && err.statusCode) {
        const { statusCode, message } = err;
        res.status(statusCode).json({ message });
        return
      }
      res.status(500).json({ message: err.message });
    });
  }

  public start(port: number | string) {
    this.server.listen(port, () => console.log('App is running on port ' + port));
  }
}