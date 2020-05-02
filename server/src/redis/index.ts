import session from 'express-session'
import connectRedis from 'connect-redis'
import client from './client'
import { RedisClient } from 'redis'

const RedisStore = connectRedis(session)

const sessionOption: session.SessionOptions = {
  store: new RedisStore({
    client: (client as unknown) as RedisClient,
  }),
  name: 'qid',
  secret: 'asdfghjkl12345',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 8 * 365, // 8 years
  },
}

export default sessionOption
