/*
    Builds and exports the Express app, but does NOT start it.
    src/index.mjs starts the real server; tests import this file directly,
    so they can send requests to the app without opening a port.
*/
import express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

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


app.get('/', (req, res) => {
    res.status(201).send({msg: 'Hello world'});
});

export default app;
