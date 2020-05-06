import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../entities'
import redis from '../../redis/client'
import { confirmUserPrefix } from '../../constants'

@Resolver()
class ConfirmUserResolver {
  @Mutation((returns) => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token)

    if (!userId) return false

    await User.update({ id: userId }, { confirmed: true })
    await redis.del(confirmUserPrefix + token)

    return true
  }
}

export default ConfirmUserResolver
