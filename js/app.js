"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes_1 = require("./api/v1/routes");
const routes_2 = require("./api/index/routes");
const db_1 = require("./api/v1/models/db");
const socket_1 = require("./chat/socket");
function check(...args) {
    const reducer = (acc, x) => acc && x;
    return args.reduce(reducer);
}
function interrupt(...arg) {
    //TODO
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const tag = '[SERVER]:';
        const app = express();
        const server = http.createServer(app);
        const socket = new socket_1.default(server);
        const conn = yield new db_1.default().connect();
        const port = process.env.PORT || 5000;
        if (check(conn)) {
            app.use(bodyParser.json());
            app.use(cors());
            app.use('/api/v1/', routes_1.default);
            app.use('/', routes_2.default);
            server.listen(port, () => {
                console.log(`${tag} http://localhost:${port}`);
            });
        }
        else {
            console.log(`[${tag} not listening`);
        }
    });
}
main();
//# sourceMappingURL=app.js.map