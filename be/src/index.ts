import dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import { apiRouter } from './routes';
import { corsMiddleware } from './middlewares/cors.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

dotenv.config();

const port = process.env.PORT || 8081;

const app = express();

app
  .use(corsMiddleware)
  .use(json())
  .use(urlencoded({ extended: true }))
  // Health Check
  .get('/healthz', async (_, res, next) => {
    try {
      res.send(new Date().toISOString() + ' health check');
    } catch (error) {
      console.error(`Health Check Error: ${error}`);
      next(error);
    }
  })
  .use('/api', apiRouter)
  .use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
