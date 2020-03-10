import { json, urlencoded } from "body-parser";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import mysql from 'mysql';

const app = express();

app.use(helmet());
app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));
app.set('trust proxy', 1);

app.get('/', (req, response) => {
    response.send('Hello world!');
});

const conn = mysql.createConnection({host: "ddddd.mysql.database.azure.com",
    user: "sagasw@ddddd",
    password: process.env.MYSQL_PASSWORD,
    database: "blog",
    port: 3306,
    ssl: {
        // DO NOT DO THIS
        // set up your ca correctly to trust the connection
        rejectUnauthorized: false
      }
});
conn.connect();

app.listen(3000, () => {
    console.log("server start to monitor 3000");
});
