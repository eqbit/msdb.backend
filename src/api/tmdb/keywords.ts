import axios from 'axios';
import { TMDB_API_KEY } from '../../config';
import { Keywords } from '../../types/TMDB/keywords';

export const keywords = async (tmdbId: number): Promise<Keywords> => {
  const url = `https://api.themoviedb.org/3/movie/${tmdbId}/keywords?api_key=${TMDB_API_KEY}`;
  return axios(url).then((response) => response.data);
};
