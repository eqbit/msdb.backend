import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { User } from '../../entity';
import { ChangePasswordInput } from './changePassword/ChangePasswordInput';
import { redis } from '../../Redis';
import { prefixes } from '../../constants';
import { Context } from '../../types';

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const userId = await redis.get(prefixes.changePassword + token);
    
    if (!userId) {
      throw new Error('Token not found');
    }
    
    const user = await User.findOne(userId);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    await redis.del(prefixes.changePassword + token);
    
    user.password = await bcrypt.hash(password, 12);
    
    await user.save();
    
    ctx.req.session!.userId = user.id;
    
    return user;
  }
}
