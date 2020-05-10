import { Arg, Int, Query, Resolver } from 'type-graphql';
import { Movie } from '../../entity';

@Resolver()
export class MovieResolver {
  @Query(() => Movie, { nullable: true })
  async getMovie(@Arg('name') name: string): Promise<Movie | null> {
    return await Movie.findOne({ where: { name } }) || null;
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
  
  @Query(() => Int, { nullable: true })
  async countMovies() {
    const [, count] = await Movie.findAndCount();
    return count;
  }
}
