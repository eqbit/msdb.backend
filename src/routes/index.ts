import { Express } from 'express';

export const appRouter = (app: Express) => {
  app.get('/test', (_, res) => {
    res.status(200).send('Welcome to our restful API');
  });
};
