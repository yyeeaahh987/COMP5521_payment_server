import express, { Express, Request, Response } from 'express';
import cors from 'cors';

import braintreeRouter from './api/braintree';
import btcRouter from './api/btc';

const app: Express = express();
const port = 8080;

const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};

app.use(cors(options));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  console.log(`this is typescript121231233`)
  res.send('Hello, this is Express + TypeScript');
});

app.use('/api/braintree', braintreeRouter);
app.use('/api/btc', btcRouter);

app.listen(port, () => {
  console.log(`[Server]: I am running at http://localhost:${port}`);
});