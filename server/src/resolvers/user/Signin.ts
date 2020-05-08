import { Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../../entities'
import bcrypt from 'bcryptjs'
import { Context } from '../../types'

@Resolver(User)
class SigninResolver {
  @Mutation((returns) => User, { nullable: true })
  async signin(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await User.findOne({
      where: {
        email,
      },
    })

    if (!user) return null // not giving information on the existence of users to clients

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) return null
    // if (!user.confirmed) return null

    ctx.req.session.userId = user.id

    return user
  }
}

export default SigninResolver
