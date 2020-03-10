import "reflect-metadata";

import { json, urlencoded } from "body-parser";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import mysql from 'mysql';
import fs from "fs";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(cors());
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
    connectTimeout: 60000
});

app.get('/', async (req, response) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const timeNow = new Date().toUTCString();
    let sql = `INSERT INTO logs(content)
           VALUES("got date time: ${timeNow} from ${ip}")`;
    await pool.query(sql);
    response.send('Hello world! ' + sql);
});

const port = process.env.PORT ? Number(process.env.PORT): 3000;

app.listen(port, '0.0.0.0', () => {
    console.log("server start to monitor 3000");
});
