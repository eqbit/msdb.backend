import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root, UseMiddleware
} from 'type-graphql';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entity';
import { isAuth } from '../middleware/isAuth';
import { sendEmail, confirmationUrl } from '../utils';

@Resolver(User)
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
  
  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }
  
  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();
    
    await sendEmail(email, await confirmationUrl(user.id));
    
    return user;
  }
}
