import axios from 'axios';
import { TMDB_API_KEY } from '../../config';
import { SearchResponse } from '../../types/TMDB';

export const searchMovies = async (name: string): Promise<SearchResponse> => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(name)}`;
  return axios.get(url).then(({ data }) => data);
};
