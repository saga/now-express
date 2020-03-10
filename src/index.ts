import { json, urlencoded } from "body-parser";
import express from "express";
import * as compression from "compression";
import * as helmet from "helmet";

const app = express();

app.use(helmet());
app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));
app.set('trust proxy', 1);

app.get('/', (req, response) => {
    response.send('Hello world!');
});

app.listen(3000, () => {
    console.log("server start to monitor 3000");
});
