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
class DbUtils {
    /**
     * Establish a mongoose connection
     */
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            let isConnected = true;
            try {
                this.setCallbacks();
                yield mongoose.connect([
                    `mongodb://`,
                    `${this.username}`,
                    `:${this.password}`,
                    `@${this.host}`,
                    `:${this.port}`,
                    `/${this.database}`
                ].join(''), this.options);
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
    static close(msg, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            let isClosed = true;
            try {
                yield mongoose.connection.close(() => {
                    console.log(`Mongoose disconnected through ${msg}`);
                    callback();
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
    static setCallbacks() {
        mongoose.connection.on('connected', this.connectedCallback);
        mongoose.connection.on('error', this.errorCallback);
        mongoose.connection.on('disconnected', this.disconnectedCallback);
    }
    static connectedCallback() {
        console.log('Mongoose connected');
    }
    static disconnectedCallback() {
        console.log('Mongoose disconnected');
    }
    static errorCallback(error) {
        console.error(`Mongoose error: ${error}`);
    }
}
DbUtils.username = 'heroku_v868mw88';
DbUtils.password = 'lfi13lqoa66h6bf56das06dthg';
DbUtils.database = 'heroku_v868mw88';
DbUtils.host = 'ds251799.mlab.com';
DbUtils.port = 51799;
DbUtils.options = {
    useNewUrlParser: true,
    poolSize: 10,
    useUnifiedTopology: true
};
/**
 * Nodemon restarted
 */
process.once('SIGUSR2', () => {
    DbUtils.close('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
/**
 * Heroku closes the app
 */
process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
    DbUtils.close('Heroku shutdown', () => {
        process.exit(0);
    });
}));
/**
 * App has been terminated by SIGINT
 */
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    DbUtils.close('app termination', () => {
        process.exit(0);
    });
}));
exports.default = DbUtils;
