import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity';
import { restorePasswordUrl, sendEmail } from '../utils';

@Resolver(User)
export class RestorePasswordResolver {
  @Mutation(() => Boolean)
  async restorePassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return false;
    }
    
    await sendEmail(email, await restorePasswordUrl(user.id));
    
    return true;
  }
}
