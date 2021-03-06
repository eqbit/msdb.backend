import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field()
  @Column('text', { unique: true })
  name: string;
  
  @Field()
  @Column()
  genre: string;
  
  @Field()
  @Column()
  directedBy: string;
  
  @Field()
  @Column()
  writtenBy: string;
  
  @Field()
  @Column()
  description: string;
  
  @Field()
  @Column()
  customDescription: string;
  
  @Field()
  @Column()
  year: number;
  
  @Field()
  @Column()
  popularity: number;
  
  @Field()
  @Column()
  poster: string;
  
  @Field()
  @Column()
  trailer: string;
  
  @Field()
  @Column('text', { unique: true })
  tmdbId: string;
  
  @Field()
  @Column('text')
  updated: string;
}
