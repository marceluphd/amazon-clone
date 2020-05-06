import { Resolver, Mutation, Arg } from 'type-graphql'
import { v4 } from 'uuid'
import { User } from '../../entities'
import redis from '../../redis/client'
import { sendEmail } from '../../utils'
import { forgetPasswordPrefix } from '../../constants'

@Resolver()
class ForgotPasswordResolver {
  @Mutation((returns) => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } })

    if (!user) return true // don't want to indicate to client email exists

    const token = v4()
    await redis.set(forgetPasswordPrefix + token, user.id, 'ex', 60 * 60 * 24) // 1 day expiration

    await sendEmail(
      email,
      `http://localhost:3000/user/change-password/${token}`
    )

    return true
  }
}

export default ForgotPasswordResolver
