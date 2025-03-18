import express from 'express';
import movieRouters from './routers/moviesRouters.js';
import setImagePath from './middlewares/imagePath.js';
import cors from 'cors';

import dotenv from 'dotenv';  
dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(
    cors({
        origin: process.env.FRONTEND_APP,
    })
);

app.use(express.json());  
app.use(setImagePath);
app.use('/movies', movieRouters);

// Rotta per le immagini
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server in funzione sulla porta: ${port}`);
});