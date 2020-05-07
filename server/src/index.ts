import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import Express from 'express'
import session from 'express-session'
import redisSession from './redis'
import cors from 'cors'

const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
}

const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/**/*.ts'],
    authChecker: ({ context: { req } }) => {
      if (req.session.userId) return true

      return false
    },
  })

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
  })

  const app = Express()
  app.use(cors(corsOptions))
  app.use(session(redisSession))

  server.applyMiddleware({ app, cors: corsOptions })
  app.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  })
}

main()
