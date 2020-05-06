import { Resolver, Mutation, Arg, InputType, Field, Ctx } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entities'
import redis from '../../redis/client'
import { forgetPasswordPrefix } from '../../constants'
import { Context } from '../../types'
import { PasswordInput } from '../shared'

@InputType()
class ChangePasswordInput extends PasswordInput {
  @Field()
  token: string
}

@Resolver()
class ChangePasswordResolver {
  @Mutation((returns) => User, { nullable: true })
  async changePassword(
    @Arg('data') data: ChangePasswordInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const { token, password } = data
    const userId = await redis.get(forgetPasswordPrefix + token)

    if (!userId) return null // bad token or token has expired
    const user = await User.findOne(userId)
    if (!user) return null // something went wrong, user should exist if userId was retrived from redis...

    user.password = await bcrypt.hash(password, 12)
    await redis.del(forgetPasswordPrefix + token) // delete token so people can't change password over and over

    await user.save()
    ctx.req.session.userId = user.id // logging user in automatically after password change

    return user
  }
}

export default ChangePasswordResolver
