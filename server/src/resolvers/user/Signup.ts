import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  FieldResolver,
  Root,
  Ctx,
} from 'type-graphql'
import { User } from '../../entities'
import bcrypt from 'bcryptjs'
import { Length, IsEmail } from 'class-validator'
import { Context } from '../../types'
import { sendEmail, createConfirmationUrl } from '../../utils'

@InputType()
class SignupInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  password: string
}

@Resolver(User)
class SignupResolver {
  @FieldResolver()
  async fullName(@Root() parent: User): Promise<string> {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Mutation((returns) => User)
  async signup(
    @Arg('input') createUserInput: SignupInput,
    @Ctx() ctx: Context
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 12)

    const user = await User.create({
      ...createUserInput,
      email: createUserInput.email.toLowerCase(),
      password: hashedPassword,
    }).save()

    ctx.req.session.userId = user.id
    await sendEmail(user.email, await createConfirmationUrl(user.id))

    return user
  }
}

export default SignupResolver
