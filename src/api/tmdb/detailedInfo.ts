import axios from 'axios';
import { TMDB_API_KEY } from '../../config';
import { DetailedInfo } from '../../types';
import { serialize } from '../../utils/serialize';

interface Options {
  tmdbId: number;
  language: 'ru' | 'en';
  append_to_response: string[];
}

export const getDetailedInfo = async (options: number | Options): Promise<DetailedInfo> => {
  let params = {
    api_key: TMDB_API_KEY,
    language: 'ru',
    append_to_response: ['keywords', 'credits']
  };
  let tmdbId: number;
  
  if (typeof options === 'number') {
    tmdbId = options;
  } else if (typeof options === 'object') {
    const { tmdbId: id, ...rest } = options;
    tmdbId = id;
    params = {
      ...params,
      ...rest
    };
  } else {
    throw new Error('Incorrect getDetailedInfo options type');
  }
  
  const url = `https://api.themoviedb.org/3/movie/${tmdbId}?${serialize(params)}`;
  console.log(url);
  return axios.get(url).then(({ data }) => data);
};
