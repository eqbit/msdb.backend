import { Express } from 'express';

export const appRouter = (app: Express) => {
  app.post('/add-movie', (req, res) => {
    console.log(req.body);
    return res.send('"success"');
  });
};
