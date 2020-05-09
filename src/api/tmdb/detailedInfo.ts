import axios from 'axios';
import { TMDB_API_KEY } from '../../config';
import { DetailedInfo } from '../../types';

export const getDetailedInfo = async (tmdbId: number): Promise<DetailedInfo> => {
  const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${TMDB_API_KEY}&language=ru`;
  return axios.get(url).then(({ data }) => data);
};
