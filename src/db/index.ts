import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

declare global {
  var db: ReturnType<typeof drizzle> | undefined;
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
});

export const db = global.db ?? drizzle(pool);

if (process.env.NODE_ENV !== 'production') {
  global.db = db;
}
