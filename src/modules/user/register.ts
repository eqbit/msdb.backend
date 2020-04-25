import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity';
import { isAuth } from '../middleware/isAuth';
import { sendEmail, confirmationUrl } from '../utils';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return 'Hello World!';
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
