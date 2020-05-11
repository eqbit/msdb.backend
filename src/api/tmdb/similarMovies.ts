import axios from 'axios';
import { TMDB_API_KEY } from '../../config';
import { MiddleDetailedInfo, SimilarMovies } from '../../types/TMDB';

export const similarMovies = async (tmdbId: number): Promise<MiddleDetailedInfo[] | never> => {
  const url = `https://api.themoviedb.org/3/movie/${tmdbId}/similar?api_key=${TMDB_API_KEY}&language=ru-RU&page=1`;
  const data: SimilarMovies = await axios(url).then((response) => response.data);
  
  return data.results;
};

export const similarMovieIds = async (tmdbId: number): Promise<number[] | never> => {
  const movies = await similarMovies(tmdbId);
  return movies.map((movie) => movie.id);
};
