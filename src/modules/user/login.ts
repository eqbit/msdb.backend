import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import * as bcrypt from 'bcryptjs';

import { User } from '../../entity';
import { Context } from '../../types';

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return null;
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
      return null;
    }
    
    if (!user.emailConfirmed) {
      throw new Error('You must confirm your email before you can log in');
    }
    
    ctx.req.session!.userId = user.id;
    
    return user;
  }
}
