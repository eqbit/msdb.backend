import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Movie } from '../../entity';
import { similarMovieIds } from '../../api/tmdb';

@Resolver()
export class MovieResolver {
  @Query(() => Movie, { nullable: true })
  async getMovie(@Arg('id') id: number): Promise<Movie | null> {
    return await Movie.findOne(id) || null;
  }
  
  @Query(() => [ Movie ], { nullable: true })
  async getMovies(
    @Arg('itemsPerPage') itemsPerPage: number,
    @Arg('page') page: number
  ) {
    return Movie.find({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      order: {
        popularity: 'DESC'
      }
    });
  }
  
  @Query(() => Movie, { nullable: true })
  async getRandomMovie() {
    const moviesNumber = await this.countMovies();
    const movies = await Movie.find({
      skip: Math.floor(Math.random() * moviesNumber),
      take: 1
    });
    return movies[0] || null;
  }
  
  @Query(() => Int, { nullable: true })
  async countMovies() {
    const [ , count ] = await Movie.findAndCount();
    return count;
  }
  
  @Query(() => [ Movie ], { nullable: true })
  async getSimilarMovies(
    @Arg('id') id: number
  ) {
    const movie = await Movie.findOne(id);
    
    if (!movie) {
      throw new Error('Movie not found');
    }
    
    const ids = await similarMovieIds(+movie.tmdbId);
    
    return Movie.find({
      where: ids.map((tmdbId) => ({ tmdbId }))
    });
  }
}
