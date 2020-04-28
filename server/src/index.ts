import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema, Resolver, Query } from 'type-graphql'
import { createConnection } from 'typeorm'

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return 'hello world'
  }
}

const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [HelloResolver],
  })

  const server = new ApolloServer({ schema })
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
}

main()
