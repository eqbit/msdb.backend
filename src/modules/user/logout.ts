import { Ctx, Mutation, Resolver } from 'type-graphql';
import { Context } from '../../types';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return new Promise((resolve, reject) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      ctx.req.session!.destroy((error) => {
        if (error) {
          console.log(error);
          reject(new Error('Error logging out'));
        }
        
        ctx.res.clearCookie('qid');
        return resolve(true);
      }));
  }
}
