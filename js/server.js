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
const Express = require("express");
const db_1 = require("./utils/db");
const routes_1 = require("./api/v1/routes");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = Express();
        const port = process.env.PORT || 5000;
        const conn = yield db_1.default.connect();
        if (conn) {
            app.use(routes_1.default);
            app.listen(port, () => {
                console.log(`Server listening on: http://localhost:${port}`);
            });
        }
    });
}
main();
