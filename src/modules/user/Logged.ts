import { Query, Resolver, Ctx } from 'type-graphql';
import { User } from '../../entity';
import { Context } from '../../types';

@Resolver()
export class LoggedResolver {
  @Query(() => User, { nullable: true })
  async logged(@Ctx() ctx: Context): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return undefined;
    }
    
    return User.findOne(ctx.req.session!.userId);
  }
}
