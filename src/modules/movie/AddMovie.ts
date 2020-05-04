import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { Movie } from '../../entity';
import { isAuth } from '../middleware';
import { AddMovieInput } from './addMovie/AddMovieInput';

@Resolver()
export class AddMovieResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
  
  @Mutation(() => Movie)
  async addMovie(
    @Arg('data') {
      name,
      genre,
      directedBy,
      writtenBy,
      tmdbId,
      year,
      description
    }: AddMovieInput
  ): Promise<Movie> {
    const movie = await Movie.create({
      name,
      genre,
      directedBy,
      writtenBy,
      tmdbId,
      year,
      description
    }).save();
    
    return movie;
  }
}
