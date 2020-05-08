import { Resolver, Query, Ctx } from 'type-graphql'
import { Context } from '../../types'
import { User } from '../../entities'

@Resolver()
class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | null> {
    const userId = ctx.req.session.userId

    if (userId) return User.findOne(userId)

    return null
  }
}

export default MeResolver
