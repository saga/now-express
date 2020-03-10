"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const path = require("path");
const app = express();
app.use(helmet());
app.use(body_parser_1.json());
app.use(compression());
app.use(body_parser_1.urlencoded({ extended: true }));
app.set('trust proxy', 1);
// serve the client side
app.use(express.static(path.join(__dirname, "../client")));
app.get('/api', (req, response) => {
    response.send('Hello world!');
});
app.listen(4200, () => {
    console.log("server start to monitor 4200");
});
//# sourceMappingURL=index.js.map