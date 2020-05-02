import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  FieldResolver,
  Root,
  Query,
} from 'type-graphql'
import { User } from '../entities'
import * as bcrypt from 'bcryptjs'

@InputType()
class CreateUserInput implements Partial<User> {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  password: string
}

@Resolver(User)
class UserResolver {
  @FieldResolver()
  async fullName(@Root() parent: User): Promise<string> {
    return `${parent.firstName} ${parent.lastName}`
  }

  @Mutation((returns) => User)
  async signupUser(
    @Arg('input') createUserInput: CreateUserInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 12)

    const user = await User.create({
      ...createUserInput,
      password: hashedPassword,
    }).save()

    return user
  }
}

export default UserResolver
