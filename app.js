import express from 'express';
import movieRouters from './routers/movisRouters';

const app = express();
const port = 3000;

app.use('/movis', movieRouters)

app.listen(port, () => {
    console.log(`Server movis in funzione sulla porta: ${port}`)
});

