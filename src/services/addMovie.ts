import { AddMovieResolver } from '../modules/movie';
import { getDetailedInfo } from '../api/tmdb';
import { responseMessage } from '../utils';

export const addMovieResolver = new AddMovieResolver();

export const addMovieService = async (tmdbId: number) => {
  try {
    const result = await getDetailedInfo(tmdbId);
    
    if (result.popularity < 10) {
      return responseMessage(`Movie '${result.title}' is not popular enough`);
    }
    
    const response = await addMovieResolver.addMovie({
      name: result.title,
      genre: result.genres.map((genre) => genre.name).join(','),
      directedBy: '',
      writtenBy: '',
      description: result.overview,
      customDescription: '',
      year: new Date(result.release_date).getFullYear(),
      updated: `${new Date()}`,
      trailer: '',
      poster: `http://image.tmdb.org/t/p/w300${result.poster_path}`,
      popularity: Math.floor(result.popularity),
      tmdbId: `${result.id}`
    });
    
    return response.name ? responseMessage(`${response.name} added to database successfully`) : response;
  } catch (e) {
    return responseMessage(e.message);
  }
};
