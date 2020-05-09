import { Express } from 'express';
import { addMovieService } from '../services/addMovie';
import { responseMessage } from '../utils';

export const appRouter = (app: Express) => {
  app.get('/add-movie/:id', async (req, res) => {
    if (req.params && req.params.id) {
      const id = +req.params.id;
      return res.send(await addMovieService(id));
    }
    return res.send(responseMessage('Missing required parameter `id`'));
  });
};
