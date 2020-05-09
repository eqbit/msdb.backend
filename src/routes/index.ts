import { Express } from 'express';

export const appRouter = (app: Express) => {
  app.post('/addMovie', (req, res) => {
    console.log(Object.keys(req.body));
    return res.send('"success"');
  });
};
