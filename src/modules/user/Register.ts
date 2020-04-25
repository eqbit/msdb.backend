import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity';
import { isAuth } from '../middleware';
import { sendEmail, confirmationUrl } from '../utils';
import { RegisterInput } from './register/RegisterInput';

@Resolver()
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
  
  @Mutation(() => User)
  async register(
    @Arg('data') {
      firstName,
      lastName,
      email,
      password
    }: RegisterInput
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
