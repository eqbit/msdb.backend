import { Length, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddMovieInput {
  @Field()
  @Length(1, 50)
  name: string;
  
  @Field()
  @Length(1, 50)
  genre: string;
  
  @Field({ nullable: true, defaultValue: '' })
  @Length(0, 50)
  directedBy?: string;
  
  @Field({ nullable: true, defaultValue: '' })
  @Length(0, 50)
  writtenBy?: string;
  
  @Field({ nullable: true, defaultValue: '' })
  @Length(0, 2000)
  description?: string;
  
  @Field({ nullable: true, defaultValue: 1800 })
  @Min(1800)
  year?: number;
  
  @Field({ nullable: true, defaultValue: '' })
  tmdbId?: string;
}
