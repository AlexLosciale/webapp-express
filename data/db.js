import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const conncection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conncection.connect((err) =>{
    if (err) throw err;
    console.log('Connessione al DB avvenuta con successo');
});

export default conncection;

