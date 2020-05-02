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
const io = require("socket.io");
class Socket {
    constructor() {
        this.socket = null;
    }
    openSocket(server) {
        let isSocketOpened = true;
        try {
            this.socket = io(server);
            this.setCallbacks();
        }
        catch (err) {
            isSocketOpened = false;
            console.error(err);
        }
        finally {
            return isSocketOpened;
        }
    }
    closeSocket() {
        let isSocketClosed = true;
        try {
            this.socket.close();
        }
        catch (err) {
            isSocketClosed = false;
            console.error(err);
        }
        finally {
            return isSocketClosed;
        }
    }
    setCallbacks() {
        this.socket.on('connection', this.newConnectionCallback);
    }
    newConnectionCallback() {
        console.log('New connection');
    }
    sigint() {
        return __awaiter(this, void 0, void 0, function* () {
            const closed = this.closeSocket();
            return closed;
        });
    }
    sigterm() {
        return __awaiter(this, void 0, void 0, function* () {
            const closed = this.closeSocket();
            return closed;
        });
    }
    sigusr2() {
        return __awaiter(this, void 0, void 0, function* () {
            const closed = this.closeSocket();
            return closed;
        });
    }
}
exports.default = Socket;
