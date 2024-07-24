import dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import { apiRouter } from './routes';
import { corsMiddleware } from './middlewares/cors.middleware';

dotenv.config();

const port = process.env.PORT || 8081;

const app = express();

app
  .use(corsMiddleware)
  .use(json())
  .use(urlencoded({ extended: true }))
  .use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
