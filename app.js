import express from 'express';
import movieRouters from './routers/movisRouters';
import setImagePath from './middlewares/imagePath';

const app = express();
const port = env.SERVER_PORT;

app.use('/movis', movieRouters)

//rotta immagini
app.use(express.static('public'))
app.use(express.json())
app.use(setImagePath)


app.listen(port, () => {
    console.log(`Server movis in funzione sulla porta: ${port}`)
});

