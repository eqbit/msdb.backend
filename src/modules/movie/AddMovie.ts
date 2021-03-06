import {
  Arg,
  Mutation,
  Resolver
} from 'type-graphql';
import { Movie } from '../../entity';
import { AddMovieInput } from './addMovie/AddMovieInput';

@Resolver()
export class AddMovieResolver {
  @Mutation(() => Movie)
  async addMovie(
    @Arg('data') {
      name,
      genre,
      directedBy,
      writtenBy,
      tmdbId,
      updated,
      customDescription,
      year,
      description,
      popularity,
      poster,
      trailer
    }: AddMovieInput
  ): Promise<Movie | never> {
    const existedMovie = await Movie.findOne({ where: { name } });
    
    let localName = name;
    
    if (existedMovie) {
      if (year) {
        if (existedMovie.year === year) {
          throw new Error(`Movie '${name}' released in ${year} already exists in the database`);
        }
        
        const existedMovieWithYear = await Movie.findOne({
          where: { name: `${name} ${year}` }
        });
        
        if (existedMovieWithYear) {
          throw new Error(`Movie '${name}' released in ${year} already exists in the database`);
        } else {
          localName = `${name} ${year}`;
        }
      } else {
        throw new Error(`Movie '${name}' already exists in the database`);
      }
    }
    
    return Movie.create({
      name: localName,
      genre,
      directedBy,
      writtenBy,
      tmdbId,
      updated,
      customDescription,
      year,
      description,
      popularity,
      poster,
      trailer
    }).save();
  }
}
