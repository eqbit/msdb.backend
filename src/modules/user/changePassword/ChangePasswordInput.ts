import { Field, InputType } from 'type-graphql';
import { PasswordInput } from '../../shared';

@InputType()
export class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string;
}
