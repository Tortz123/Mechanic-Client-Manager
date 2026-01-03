/*
    to run program:
    npm run start:dev
*/
import express from 'express';
import routes from './routes/index.mjs';

const app = express();

// to register JSON Middleware
app.use(express.json());

// to register all routers
app.use(routes);


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(201).send({msg: 'Hello world'});
});


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});