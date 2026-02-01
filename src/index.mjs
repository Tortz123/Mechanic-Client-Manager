/*
    to run program:
    npm run start:dev
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



const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(201).send({msg: 'Hello world'});
});


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});