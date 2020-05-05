import { Arg, Mutation } from 'type-graphql';
import { Movie } from '../../entity';
import { AddMovieInput } from './addMovie/AddMovieInput';

export class UpdateMovieResolver {
  @Mutation(() => Movie, { nullable: true })
  async updateMovie(
    @Arg('id') id: number,
    @Arg('data') data: AddMovieInput
  ): Promise<Movie | null> {
    const movie = await Movie.findOne(id);
    
    if (!movie) {
      return null;
    }
  
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        movie[key] = value;
      }
    });
  
    return movie.save();
  }
}
