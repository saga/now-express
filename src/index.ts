import { json, urlencoded } from "body-parser";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import mysql from 'mysql';
import fs from "fs";

const app = express();

app.use(helmet());
app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));
app.set('trust proxy', 1);

const pool = mysql.createConnection({
    host: "ddddd.mysql.database.azure.com",
    user: "sagasw@ddddd",
    password: process.env.MYSQL_PASSWORD,
    database: "blog",
    port: 3306,
    connectTimeout: 120000
});

app.get('/', async (req, response) => {
    const timeNow = new Date().toUTCString();
    let sql = `INSERT INTO logs(content)
           VALUES("got date time: ${timeNow}")`;
    await pool.query(sql);

    response.send('Hello world! ' + sql);
});


pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});



app.listen(3000, () => {
    console.log("server start to monitor 3000");
});
