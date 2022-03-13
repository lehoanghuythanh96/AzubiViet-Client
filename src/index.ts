"use strict";
require('dotenv').config();
export const defaultConfig: any = process.env;
import express from 'express';
const app = express();
import http from 'http';
export const server = http.createServer(app);

/* --------------------------------- Sub Fns -------------------------------- */
import { SubFn } from './modules/sub_functions';

app.get('/', (req: any, res: any) => {
  res.send('<h1>Hello world</h1>');
});

const IO = require('./modules/socketIOcontroller')

server.listen(defaultConfig.APP_PORT);
