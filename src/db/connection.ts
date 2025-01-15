import postgres from 'postgres'
import { env } from '../env'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'

const connection = postgres(env.DATABASE_URL, { max: 1 })

export const db = drizzle(connection, {
  schema,
})
