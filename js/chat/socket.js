"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io");
class SocketUtils {
    constructor(server) {
        this.socket = null;
        this.socket = io(server);
        console.log(`${SocketUtils.tag} enabled`);
        this.setCallbacks();
    }
    setCallbacks() {
        this.socket.on('connection', this.newConnectionCallback);
        this.socket.on('newMessage', this.newMessageCallback);
    }
    newConnectionCallback(socket) {
        console.log(`${SocketUtils.tag} new connection`);
        socket.on('disconnect', () => {
            console.log(`${SocketUtils.tag} connection closed`);
        });
    }
    newMessageCallback(msg) {
        console.log(msg);
    }
    sigint() {
        try {
            this.socket.close();
            return new Promise((resolve, reject) => resolve(true));
        }
        catch (e) {
            return new Promise((resolve, reject) => resolve(false));
        }
    }
    sigterm() {
        try {
            this.socket.close();
            return new Promise((resolve, reject) => resolve(true));
        }
        catch (e) {
            return new Promise((resolve, reject) => resolve(false));
        }
    }
    sigusr2() {
        try {
            this.socket.close();
            return new Promise((resolve, reject) => resolve(true));
        }
        catch (e) {
            return new Promise((resolve, reject) => resolve(false));
        }
    }
}
SocketUtils.tag = '[SOCKET]:';
exports.default = SocketUtils;
//# sourceMappingURL=socket.js.map