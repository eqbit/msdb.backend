import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity';
import { redis } from '../../Redis';
import { prefixes } from '../../constants';

@Resolver(User)
export class ConfirmEmailResolver {
  @Mutation(() => Boolean)
  async confirmEmail(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(prefixes.confirmEmail + token);
    
    if (!userId) {
      return false;
    }
    
    await User.update(
      { id: +userId },
      { emailConfirmed: true }
    );
    
    await redis.del(token);
    
    return true;
  }
}
