"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.defaultConfig = void 0;
require('dotenv').config();
exports.defaultConfig = process.env;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
exports.server = http_1.default.createServer(app);
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
const IO = require('./modules/socketIOcontroller');
exports.server.listen(exports.defaultConfig.APP_PORT);
//# sourceMappingURL=index.js.map