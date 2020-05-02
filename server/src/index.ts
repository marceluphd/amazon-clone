import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { ItemResolver, UserResolver } from './resolvers'

const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [ItemResolver, UserResolver],
  })

  const server = new ApolloServer({ schema, cors: true })
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
  })
}

main()
