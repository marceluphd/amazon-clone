import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../entities'
import redis from '../../redis/client'

@Resolver()
class ConfirmUserResolver {
  @Mutation((returns) => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(token)

    if (!userId) return false

    await User.update({ id: userId }, { confirmed: true })
    await redis.del(token)

    return true
  }
}

export default ConfirmUserResolver
