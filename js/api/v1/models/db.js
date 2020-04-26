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
const mongoose = require("mongoose");
const Interruptable_1 = require("../../../utils/Interruptable");
class DbUtils extends Interruptable_1.default {
    constructor() {
        super();
    }
    /**
     * Establish a mongoose connection
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let isConnected = true;
            try {
                this.setCallbacks();
                yield mongoose.connect([
                    `mongodb://`,
                    `${DbUtils.username}`,
                    `:${DbUtils.password}`,
                    `@${DbUtils.host}`,
                    `:${DbUtils.port}`,
                    `/${DbUtils.database}`
                ].join(''), DbUtils.options);
            }
            catch (err) {
                console.error(err.reason);
                isConnected = false;
            }
            finally {
                return isConnected;
            }
        });
    }
    /**
     * Close a mongoose connection
     * @param msg
     * @param callback
     */
    close(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            let isClosed = true;
            try {
                yield mongoose.connection.close(() => {
                    console.log(`Mongoose disconnected through ${msg}`);
                });
            }
            catch (err) {
                console.error(err);
                isClosed = false;
            }
            finally {
                return isClosed;
            }
        });
    }
    setCallbacks() {
        mongoose.connection.on('connected', this.connectedCallback);
        mongoose.connection.on('error', this.errorCallback);
    }
    connectedCallback() {
        console.log('Mongoose connected');
    }
    errorCallback(error) {
        console.error(`Mongoose error: ${error}`);
    }
    sigint() {
        return __awaiter(this, void 0, void 0, function* () {
            const disconnected = yield this.close('sigint');
            return disconnected;
        });
    }
    sigterm() {
        return __awaiter(this, void 0, void 0, function* () {
            const disconnected = yield this.close('sigterm');
            return disconnected;
        });
    }
    sigusr2() {
        return __awaiter(this, void 0, void 0, function* () {
            const disconnected = yield this.close('sigusr2');
            return disconnected;
        });
    }
}
DbUtils.username = process.env.DB_USERNAME;
DbUtils.password = process.env.DB_PASSWORD;
DbUtils.database = process.env.DB_DATABASE;
DbUtils.host = process.env.DB_HOST;
DbUtils.port = process.env.DB_PORT;
DbUtils.options = {
    useNewUrlParser: true,
    poolSize: 10,
    useUnifiedTopology: true
};
exports.default = DbUtils;
