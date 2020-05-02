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
import bcrypt from 'bcryptjs'
import { Length, IsEmail } from 'class-validator'

@InputType()
class CreateUserInput implements Partial<User> {
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
      email: createUserInput.email.toLowerCase(),
      password: hashedPassword,
    }).save()

    return user
  }
}

export default UserResolver