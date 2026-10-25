/*
    to run program:
    npm run dev
*/
// Must be the first import: it loads .env into process.env before any
// other module (like db.mjs) reads its settings. In production there is
// no .env file, so this does nothing and the host's env vars are used.
import 'dotenv/config';
import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

// Fail fast: refuse to start without required config, instead of
// starting "successfully" and then failing on every request.
const requiredEnvVars = ['DATABASE_URL', 'SESSION_SECRET'];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    console.error('Copy .env.example to .env and fill them in.');
    process.exit(1);
}

const app = express();
// all Middleware must be called before any routes/endpoints 
// to register JSON Middleware
app.use(express.json());
app.use(cookieParser());

app.use(express.static('frontend'));

app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    },
}));


// to register all routers
app.use('/api', routes);



const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(201).send({msg: 'Hello world'});
});


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});