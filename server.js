import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import { notFoundError, errorHandler } from './middlewares/error-handler.js';
import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';

const app =  express();
const hostname = '127.0.0.1';
const port = process.env.port || 9090;
const databaseName = 'revDB';
const mongoUrl = process.env.DB_URL ? `${process.env.DB_URL}/${databaseName}` : `mongodb://127.0.0.1:27017/${databaseName}`;
mongoose.set('debug', true);
mongoose.set('strictQuery', false)
mongoose.Promise = global.Promise;
console.log(mongoUrl)
//Connexion
mongoose
    .connect(mongoUrl)
    //.connect(`mongodb://127.0.0.1:27017/${databaseName}`)
    .then(() => {
            console.log(`Connected to ${databaseName}`);
    })
    .catch(err =>{
            console.log(err);
    });


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/img', express.static('public/images'));

/*
--------- Middleware ---------
*/
// A chaque requete
app.use((req, res, next)=>{
    console.log("Middlexare just run !")
    next();
})

// Sur toute demande /user
app.use('/user', (req, res, next)=>{
    console.log("Middlexare just run on /user route !")
    next();
})

app.use('/user', userRoutes);
app.use('/post', postRoutes);

/*
--------- Error Middleware ---------
*/
app.use(notFoundError);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server running on http://${hostname}:${port}`);
})