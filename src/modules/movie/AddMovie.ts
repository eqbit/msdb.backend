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
  ): Promise<Movie | never> {
    const existedMovie = await Movie.findOne({ where: { name } });
    
    let localName = name;
    
    if (existedMovie) {
      if (year) {
        const existedMovieWithYear = await Movie.findOne({
          where: { name: `${name} ${year}` }
        });
        
        if (existedMovieWithYear) {
          throw new Error(`Movie '${name}' already exists in the database`);
        } else {
          localName = `${name} ${year}`;
        }
      }
    }
    
    return Movie.create({
      name: localName,
      genre,
      directedBy,
      writtenBy,
      tmdbId,
      year,
      description
    }).save();
  }
}
