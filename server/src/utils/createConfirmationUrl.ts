import { v4 } from 'uuid'
import redis from '../redis/client'
import { confirmUserPrefix } from '../constants'

export default async (userId: string) => {
  const token = v4()
  await redis.set(confirmUserPrefix + token, userId, 'ex', 60 * 60 * 24) // 1 day expiration

  return `http://localhost:3000/user/confirm/${token}`
}
