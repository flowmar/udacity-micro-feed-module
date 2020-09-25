import cors from 'cors';
import express from 'express';
import { sequelize } from './sequelize';

import { IndexRouter } from './controllers/v0/index.router';

import bodyParser from 'body-parser';
import { config } from './config/config';
import { V0_FEED_MODELS } from './controllers/v0/model.index';

(async () => {
  await sequelize.addModels(V0_FEED_MODELS);
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080;
  const c = config.dev;

  app.use(bodyParser.json());

  // CORS Should be restricted
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
  });

  app.use(
    cors({
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Authorization'
      ],
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: c.url
    })
  );

  app.use('/api/v0/', IndexRouter);

  // Root URI call
  app.get('/', async (req, res) => {
    res.send('/api/v0/');
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:8080`);
    console.log(`press CTRL+C to stop server`);
  });
})();
