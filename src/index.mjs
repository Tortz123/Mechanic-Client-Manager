/*
    Entry point: loads config, checks it, and starts the server.
    The app itself is built in src/app.mjs.

    to run program:
    npm run dev
*/
// Import order matters here: ES modules run their imports top to bottom,
// before this file's own code.
// 1. Load .env into process.env. In production there is no .env file,
//    so this does nothing and the host's env vars are used.
import 'dotenv/config';
// 2. Exit with a clear message if required config is missing.
import './utils/checkEnv.mjs';
// 3. Only now build the app, which reads that config.
import app from './app.mjs';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
