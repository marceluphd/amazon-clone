import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import {
  ItemResolver,
  SignupResolver,
  SigninResolver,
  MeResolver,
} from './resolvers'
import Express from 'express'
import session from 'express-session'
import redisSession from './redis'
import cors from 'cors'

const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [ItemResolver, SignupResolver, SigninResolver, MeResolver],
  })

  const server = new ApolloServer({
    schema,
    context: ({ req }: any) => ({ req }),
  })

  const app = Express()
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  )
  app.use(session(redisSession))

  server.applyMiddleware({ app })
  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  })
}

main()
