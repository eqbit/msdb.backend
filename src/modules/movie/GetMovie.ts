import { Arg, Query, Resolver } from 'type-graphql';
import { Movie } from '../../entity';

@Resolver()
export class MovieResolver {
  @Query(() => Movie, { nullable: true })
  async getMovie(@Arg('name') name: string): Promise<Movie | null> {
    return await Movie.findOne({ where: { name } }) || null;
  }
}
