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
  year: number;
  
  @Field()
  @Column('text')
  tmdbId: string;
}
