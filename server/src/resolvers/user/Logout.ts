import { Resolver, Mutation, Ctx } from 'type-graphql'
import { Context } from '../../types'

@Resolver()
export class LogoutResolver {
  @Mutation((returns) => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return new Promise((res, rej) =>
      ctx.req.session.destroy((err) => {
        if (err) {
          return rej(false)
        }

        ctx.res.clearCookie('qid')
        return res(true)
      })
    )
  }
}
