import { InputType, Field } from 'type-graphql'
import { Min } from 'class-validator'

@InputType()
class PasswordInput {
  @Field()
  @Min(5)
  password: string
}

export default PasswordInput
