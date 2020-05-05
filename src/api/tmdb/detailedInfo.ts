import axios from 'axios';
import { TMDB_API_KEY } from '../../config';
import { DetailedInfo } from '../../types';

export const getDetailedInfo = (id: number): Promise<DetailedInfo> => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`;
  return axios.get(url).then(({ data }) => data);
};
