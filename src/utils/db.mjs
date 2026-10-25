import { Pool } from 'pg';

// One connection string (postgres://USER:PASSWORD@HOST:PORT/DATABASE)
// instead of separate settings, because that's what Neon, Render, CI,
// and Docker all provide. dotenv is loaded once, in index.mjs.
const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
});

export { pool };
