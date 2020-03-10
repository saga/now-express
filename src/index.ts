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

const access = fs.createWriteStream('/node.access.log', { flags: 'a' });
const error = fs.createWriteStream('/node.error.log', { flags: 'a' });

// redirect stdout / stderr
process.stdout.pipe(access);
process.stderr.pipe(error);

const pool = mysql.createPool({
    connectionLimit: 12,
    host: "ddddd.mysql.database.azure.com",
    user: "sagasw@ddddd",
    password: process.env.MYSQL_PASSWORD,
    database: "blog",
    port: 3306,
    connectTimeout: 120000,
    ssl: {
        rejectUnauthorized: false
      }
});
pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
  });

app.get('/', (req, response) => {
    const timeNow = new Date();

    let sql = `INSERT INTO logs(content)
           VALUES("got date time: ${timeNow.toUTCString()}")`;
    pool.query(sql);

    response.send('Hello world! ' + sql);
});


pool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});



app.listen(3000, () => {
    console.log("server start to monitor 3000");
});
