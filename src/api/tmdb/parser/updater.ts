import { getDetailedInfo } from '../detailedInfo';
import { ShortMovie } from '../../../types/TMDB';
import { sleep } from '../../../utils';
import { AddMovieResolver } from '../../../modules/movie';

const movies: ShortMovie[] = require('./output/output.json');

const Resolver = new AddMovieResolver();

const update = async (id: number) => {
  try {
    const result = await getDetailedInfo(id);
  
    await Resolver.addMovie({
      name: result.title,
      genre: result.genres[0].name,
      directedBy: '',
      writtenBy: '',
      description: result.overview,
      customDescription: '',
      year: new Date(result.release_date).getFullYear(),
      updated: `${new Date()}`,
      trailer: '',
      poster: `http://image.tmdb.org/t/p/w300/${result.poster_path}`,
      popularity: Math.floor(result.popularity),
      tmdbId: `${result.id}`
    });
  } catch (e) {
    console.error(e.message);
  }
};

let i = 0;

export const updater = async () => {
  i++;
  if (movies && movies.length && i < 10) {
    const movie = movies.shift();
    if (movie) {
      await update(movie.id).then(async () => {
        await sleep(250);
        updater();
      });
    }
  }
};
