import { MiddleDetailedInfo } from './middleDetailedInfo';

export type SimilarMovies = {
  page: number;
  results: MiddleDetailedInfo[];
  total_pages: number;
  total_results: number;
};
