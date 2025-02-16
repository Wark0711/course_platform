import { env } from '@/data/env/server';
// import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "./schema"

// const sql = neon(env.NEON_DB_URL!);

export const db = drizzle({
    connection: { connectionString: env.NEON_DB_URL! },
    schema
})