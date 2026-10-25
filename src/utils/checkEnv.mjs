// Fail fast: refuse to start without required config, instead of
// starting "successfully" and then failing on every request.
// This runs as soon as it's imported, so index.mjs imports it right after
// dotenv and before app.mjs (which uses SESSION_SECRET while it loads).
const requiredEnvVars = ['DATABASE_URL', 'SESSION_SECRET'];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    console.error('Copy .env.example to .env and fill them in.');
    process.exit(1);
}
